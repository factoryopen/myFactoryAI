<template>
  <div class="ai-chat-layout">
    <!-- 主聊天区域（左侧） -->
    <div class="main-chat">
      <div class="chat-messages" ref="chatMessagesRef">
        <!-- 欢迎词 -->
        <div v-if="showWelcome && messages.length === 0 && !streamingMessage" class="message assistant welcome-message">
          <div class="content">
            <div class="message-meta assistant-meta"><span class="meta-model">AI 助手</span></div>
            <div class="message-text" v-html="getWelcomeMessage()"></div>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-for="(msg, idx) in messages" :key="idx" :class="['message', msg.role]">
          <div class="content">
            <!-- 用户消息（浅灰色背景，类似 DeepSeek） -->
            <div v-if="msg.role === 'user'">
              <div class="message-text">{{ msg.content }}</div>
              <div class="message-meta user-meta"><span class="meta-time">{{ formatTime(msg.timestamp) }}</span></div>
              <div class="message-actions">
                <el-button type="text" size="mini" icon="el-icon-document-copy" @click="copyText(msg.content)" title="复制"></el-button>
                <el-button type="text" size="mini" icon="el-icon-refresh-right" @click="resendMessage(msg.content)" title="重发"></el-button>
              </div>
            </div>

            <!-- 普通助手回复 -->
            <div v-else-if="msg.type !== 'chart' && msg.content">
              <div class="message-meta assistant-meta"><span class="meta-model">{{ msg.model || 'AI助手' }}</span></div>
              <div class="message-text" v-html="renderMarkdown(msg.content)"></div>
              <div class="message-actions">
                <el-button type="text" size="mini" icon="el-icon-document-copy" @click="copyText(msg.content)" title="复制"></el-button>
              </div>
            </div>

            <!-- 图表回复 -->
            <div v-else-if="msg.type === 'chart'">
              <div class="message-meta assistant-meta"><span class="meta-model">{{ msg.model || 'AI助手' }}</span></div>
              <div class="message-text">
                <div v-if="msg.desc" class="chart-desc">{{ msg.desc }}</div>
                <div class="table-chart-layout">
                  <div class="table-wrapper" v-if="msg.data && msg.data.length">
                    <el-table :data="msg.data" border stripe size="small" style="width:100%; height:100%">
                      <el-table-column v-for="col in Object.keys(msg.data[0])" :key="col" :prop="col" :label="col" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                  <div class="chart-wrapper" v-if="msg.chartOption">
                    <div :id="`chart_${idx}`" class="echarts-box"></div>
                  </div>
                  <div v-if="(!msg.chartOption) && (!msg.data || !msg.data.length)" class="empty-text">无数据</div>
                </div>
                <div v-if="msg.errorMessage" class="error-text">{{ msg.errorMessage }}</div>
                <div v-if="msg.showInsight && msg.insight" class="insight-report">
                  <div class="insight-header">
                    <span>数据洞察报告（模型：{{ msg.insightModel || msg.model }}）</span>
                    <el-button type="text" icon="el-icon-close" @click="closeInsight(idx)" size="small"></el-button>
                  </div>
                  <div class="insight-content" v-html="renderMarkdown(msg.insight)"></div>
                </div>
              </div>
              <div class="message-actions">
                <el-button type="text" size="mini" icon="el-icon-document-copy" @click="copyText(JSON.stringify(msg.chartOption || msg.data, null, 2))" title="复制数据"></el-button>
                <el-tooltip content="生成洞察报告" placement="top" v-if="hasDataForInsight(msg)">
                  <el-button type="text" size="mini" icon="el-icon-s-marketing" @click="generateInsight(msg, idx)" :loading="msg.insightLoading" title="洞察报告"></el-button>
                </el-tooltip>
              </div>
              <div v-if="msg.sqlExecuted" class="sql-info">
                <el-link type="info" @click="toggleSql(idx)" style="font-size:12px">📋 {{ msg.showSql ? '隐藏' : '查看' }} SQL</el-link>
                <div v-if="msg.showSql" class="sql-text">{{ msg.sqlExecuted }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 流式输出消息 -->
        <div v-if="streamingMessage" class="message assistant">
          <div class="content streaming">{{ streamingMessage }}</div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input-wrapper">
        <div class="input-container" :class="{ 'focus': inputFocused }">
          <textarea
            ref="inputTextarea"
            v-model="input"
            class="custom-textarea"
            :placeholder="inputPlaceholder"
            @keydown="handleKeydown"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            :disabled="isLoading || pptLoading"
            rows="4"
          ></textarea>
          <div class="input-toolbar">
            <!-- 停止生成按钮 -->
            <el-tooltip content="停止生成" placement="top" v-if="isLoading || pptLoading">
              <el-button class="stop-btn" icon="el-icon-video-pause" circle size="small" @click="stopGeneration"></el-button>
            </el-tooltip>
            <!-- 语音输入开关 -->
            <el-tooltip :content="isListening ? '正在倾听，点击停止' : '语音输入已停止，点击开启'" placement="top">
              <el-button
                class="voice-btn"
                :class="{ 'voice-active': isListening, 'voice-muted': !isListening }"
                icon="el-icon-microphone"
                circle
                size="small"
                @click="toggleContinuousListening"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="发送消息" placement="top">
              <el-button
                class="send-btn"
                :class="{ 'active': input.trim() }"
                icon="el-icon-s-promotion"
                circle
                size="small"
                @click="send"
                :loading="isLoading || pptLoading"
                :disabled="!input.trim() && !isLoading && !pptLoading"
              ></el-button>
            </el-tooltip>
          </div>
        </div>
        <div v-if="isListening" class="voice-status">🎙️ 正在倾听...</div>
      </div>
    </div>

    <!-- 右侧侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-label">模型</div>
      <el-tooltip content="选择大模型" placement="left">
        <el-select v-model="selectedModel" size="small" class="sidebar-select" @change="onModelChange">
          <el-option-group label="DeepSeek">
            <el-option label="DeepSeek 4.0 Flash" value="deepseek-v4-flash"></el-option>
            <el-option label="DeepSeek 4.0 Pro" value="deepseek-pro"></el-option>
          </el-option-group>
          <el-option-group label="通义千问">
            <el-option label="Qwen Plus" value="qwen-plus"></el-option>
            <el-option label="Qwen Max" value="qwen-max"></el-option>
            <el-option label="Qwen Turbo" value="qwen-turbo"></el-option>
          </el-option-group>
        </el-select>
      </el-tooltip>

      <el-tooltip content="对话模式" placement="left">
        <el-button :type="queryMode === 'chat' ? 'primary' : 'default'" icon="el-icon-chat-dot-round" circle @click="setMode('chat')"></el-button>
      </el-tooltip>

      <el-tooltip content="智能图表" placement="left">
        <el-button :type="queryMode === 'chart' ? 'primary' : 'default'" icon="el-icon-data-line" circle @click="setMode('chart')"></el-button>
      </el-tooltip>

      <el-tooltip content="历史会话" placement="left">
        <el-button icon="el-icon-tickets" circle @click="showHistoryDrawer = true"></el-button>
      </el-tooltip>

      <el-tooltip content="推荐会话" placement="left">
        <el-button icon="el-icon-star-off" circle @click="showRecommendedDrawer = true"></el-button>
      </el-tooltip>

      <el-tooltip :content="voiceReplyEnabled ? '关闭语音应答' : '开启语音应答'" placement="left">
        <el-button :type="voiceReplyEnabled ? 'success' : 'info'" icon="el-icon-headset" circle @click="toggleVoiceReply"></el-button>
      </el-tooltip>

      <el-tooltip content="麦克风设置（重新请求权限）" placement="left">
        <el-button icon="el-icon-setting" circle size="small" @click="requestMicrophonePermission"></el-button>
      </el-tooltip>
    </div>

    <!-- 历史会话抽屉 -->
    <el-drawer title="历史会话" :visible.sync="showHistoryDrawer" direction="rtl" size="360px">
      <div class="history-list">
        <div v-for="(session, idx) in historySessions" :key="idx" class="history-item">
          <div class="history-info" @click="loadHistorySession(idx)">
            <div class="history-question">{{ session.question }}</div>
            <div class="history-time">{{ session.time }}</div>
          </div>
          <el-button type="text" icon="el-icon-delete" class="history-delete" @click.stop="deleteHistorySession(idx)"></el-button>
        </div>
        <div v-if="historySessions.length === 0" class="empty-text">暂无历史会话</div>
      </div>
    </el-drawer>

    <!-- 推荐会话抽屉 -->
    <el-drawer title="推荐会话" :visible.sync="showRecommendedDrawer" direction="rtl" size="360px">
      <div class="recommended-list">
        <div v-for="rec in recommendedList" :key="rec.id" class="recommended-item" @click="useRecommendedQuery(rec)">
          <div class="recommended-title">{{ rec.title }}</div>
          <div class="recommended-desc">{{ rec.displayText || rec.title }}</div>
        </div>
        <div v-if="recommendedList.length === 0" class="empty-text">暂无推荐</div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { marked } from 'marked'

export default {
  name: 'AiChat',
  data() {
    return {
      input: '',
      messages: [],
      streamingMessage: '',
      isLoading: false,
      pptLoading: false,
      selectedModel: 'deepseek-v4-flash',
      queryMode: 'chat',
      showHistoryDrawer: false,
      showRecommendedDrawer: false,
      historySessions: [],
      currentSessionId: null,
      currentAbortController: null,
      recommendedList: [],
      showWelcome: true,
      chartColorPalette: [
        '#FFB3BA', '#C5E99B', '#B5EAD7', '#A0E7E5', '#FFDAC1',
        '#E2F0CB', '#FFCCB3', '#D4A5A5', '#9ED9CC', '#FADADD',
        '#D1C4E9', '#FFF9C4', '#FFCDB2', '#B0E0E6', '#F8BBD9',
        '#FFB7B2', '#C4E6F1', '#C7CEEA', '#FDE2C4', '#E0BBE4'
      ],
      inputFocused: false,
      recognition: null,
      isListening: false,
      voiceReplyEnabled: true,
      pendingSpeech: '',
      continuousListeningEnabled: false,
    }
  },
  computed: {
    inputPlaceholder() {
      if (this.queryMode === 'chart')
        return '📊 输入自然语言生成图表，如：不同状态制造批数量统计\n按 Enter 发送，Ctrl+Enter 换行'
      return '💬 输入问题，按 Enter 发送，Ctrl+Enter 换行'
    }
  },
  mounted() {
    marked.setOptions({ breaks: true, gfm: true })
    console.log('[AiChat] 组件已挂载，默认模型:', this.selectedModel)

    const savedModel = localStorage.getItem('preferredModel')
    if (savedModel && this.isValidModel(savedModel)) this.selectedModel = savedModel
    const savedMode = localStorage.getItem('queryMode')
    if (savedMode && ['chat', 'chart'].includes(savedMode)) this.queryMode = savedMode
    const savedVoice = localStorage.getItem('voiceReplyEnabled')
    if (savedVoice !== null) this.voiceReplyEnabled = savedVoice === 'true'

    this.loadHistoryFromStorage()
    this.fetchRecommendedQueries()
    this.startNewSession()
    this.initSpeechRecognition()
    this.$watch('input', () => this.autoResizeTextarea())
    console.log('[AiChat] 初始化完成，语音输入默认关闭')
  },
  beforeDestroy() {
    console.log('[Voice] 组件即将销毁，清理资源')
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    if (this.recognition) {
      this.recognition.stop()
      this.recognition = null
    }
  },
  updated() {
    this.renderAllCharts()
  },
  methods: {
    // 辅助方法
    formatTime(timestamp) {
      if (!timestamp) return '--:--:--'
      return new Date(timestamp).toLocaleTimeString('zh-CN', { hour12: false })
    },
    renderMarkdown(text) {
      if (!text) return ''
      try {
        return marked.parse(text)
      } catch (e) {
        console.error('[Markdown] 渲染失败，降级为纯文本', e)
        return text.replace(/\n/g, '<br>')
      }
    },
    getModelDisplayName(modelValue) {
      const nameMap = {
        'deepseek-v4-flash': 'DeepSeek 4.0 Flash',
        'deepseek-pro': 'DeepSeek 4.0 Pro',
        'qwen-plus': '通义千问 Plus',
        'qwen-max': '通义千问 Max',
        'qwen-turbo': '通义千问 Turbo'
      }
      return nameMap[modelValue] || modelValue
    },
    getWelcomeMessage() {
      const modelDisplayName = this.getModelDisplayName(this.selectedModel)
      return `
        <div style="font-size: 14px; line-height: 1.6;">
          <p style="font-size: 16px; font-weight: 500; margin-bottom: 10px;">欢迎来到 myFactoyAI！工厂系统问题，或其他相关问题，都可以找我哦~</p>
          <p>当前模型：<strong style="color: #409eff;">${modelDisplayName}</strong></p>
          <br>
          <p><strong>我能做什么：</strong></p>
          <ul style="margin: 6px 0 6px 18px;">
            <li>💬 对话模式：问答、代码、翻译、写作</li>
            <li>📊 智能图表：自然语言生成图表，表格和图表双输出</li>
            <li>📈 洞察报告：11种数学分析 + 数据深度分析</li>
            <li>🔍 智能查询：自然语言转SQL，支持容错处理</li>
            <li>🛡️ 安全防护：基于用户权限的敏感查询拦截</li>
            <li>🧠 智能理解：自动识别表结构、数据字典、代码生成器字段</li>
            <!-- <li>📄 PPT生成：输入需求，AI自动生成专业报告PPT</li> -->
            <li>⭐ 推荐会话：快速体验示例</li>
            <li>📜 历史会话：自动保存记录</li>
            <!-- <li>🎤 持续语音输入 & 实时语音应答：解放双手，智能交互</li> -->
          </ul>
          <br>
          <p><strong>未来扩展：</strong> 智能助手将支持更多操作能力，如数据修复、功能开发、批量处理等，让平台从“回答问题”升级为“帮你做事”。</p>
        </div>
      `
    },
    clearWelcome() {
      if (this.showWelcome) {
        this.showWelcome = false
        console.log('[AiChat] 欢迎词已隐藏')
      }
    },
    isValidModel(model) {
      return ['deepseek-v4-flash', 'deepseek-pro', 'qwen-plus', 'qwen-max', 'qwen-turbo'].includes(model)
    },
    onModelChange(val) {
      localStorage.setItem('preferredModel', val)
      console.log('[AiChat] 切换模型:', val)
    },
    setMode(mode) {
      this.queryMode = mode
      localStorage.setItem('queryMode', mode)
      console.log('[AiChat] 切换模式:', mode)
    },
    toggleVoiceReply() {
      this.voiceReplyEnabled = !this.voiceReplyEnabled
      localStorage.setItem('voiceReplyEnabled', this.voiceReplyEnabled)
      console.log('[AiChat] 语音应答开关:', this.voiceReplyEnabled ? '开' : '关')
      if (!this.voiceReplyEnabled && window.speechSynthesis) window.speechSynthesis.cancel()
      this.$message.info(`语音应答已${this.voiceReplyEnabled ? '开启' : '关闭'}`)
    },
    toggleSql(idx) {
      this.$set(this.messages[idx], 'showSql', !this.messages[idx].showSql)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatMessagesRef
        if (container) container.scrollTop = container.scrollHeight
      })
    },
    renderAllCharts() {
      this.$nextTick(() => {
        this.messages.forEach((msg, idx) => {
          if (msg.type === 'chart' && msg.chartOption && !msg._chartRendered) {
            const dom = document.getElementById(`chart_${idx}`)
            if (dom) {
              try {
                const chart = echarts.init(dom)
                chart.setOption(msg.chartOption)
                chart.resize()
                this.$set(msg, '_chartRendered', true)
                console.log('[Chart] 渲染成功', idx)
              } catch (e) { console.error(e) }
            }
          }
        })
      })
    },
    copyText(text) {
      navigator.clipboard.writeText(text)
        .then(() => this.$message.success('已复制'))
        .catch(() => this.$message.error('复制失败'))
    },
    resendMessage(content) {
      if (this.isLoading || this.pptLoading) {
        this.$message.warning('请等待当前回复完成后再重发')
        return
      }
      this.input = content
      this.send()
      console.log('[AiChat] 重发消息:', content.substring(0, 50))
    },
    stopGeneration() {
      if (this.currentAbortController) {
        this.currentAbortController.abort()
        this.currentAbortController = null
        console.log('[AiChat] 用户主动停止生成')
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel()
      this.$message.info('已停止生成')
    },
    autoResizeTextarea() {
      this.$nextTick(() => {
        const textarea = this.$refs.inputTextarea
        if (textarea) {
          textarea.style.height = 'auto'
          const newHeight = Math.min(textarea.scrollHeight, 200)
          textarea.style.height = Math.max(newHeight, 120) + 'px'
        }
      })
    },
    handleKeydown(e) {
      if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault()
        this.send()
      } else if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault()
        const textarea = this.$refs.inputTextarea
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        this.input = this.input.substring(0, start) + '\n' + this.input.substring(end)
        this.$nextTick(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1
          this.autoResizeTextarea()
        })
      }
    },

    // ========== 实时语音播报 ==========
    speakRealTime(chunk) {
      if (!this.voiceReplyEnabled) return
      if (!window.speechSynthesis) return
      this.pendingSpeech += chunk
      const sentences = this.pendingSpeech.split(/([。！？\n])/g)
      if (sentences.length >= 2) {
        let complete = ''
        for (let i = 0; i < sentences.length - 1; i++) complete += sentences[i]
        if (complete.trim()) {
          this.speakText(complete)
          this.pendingSpeech = sentences[sentences.length - 1] || ''
        }
      }
    },
    speakText(text) {
      if (!this.voiceReplyEnabled) return
      if (!window.speechSynthesis) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      utterance.rate = 1.1
      utterance.pitch = 1.0
      utterance.onend = () => console.log('[Voice] 语音播放完成')
      utterance.onerror = (e) => console.error('[Voice] 语音播放错误', e)
      window.speechSynthesis.speak(utterance)
    },

    // ========== 语音识别（增强日志） ==========
    initSpeechRecognition() {
      console.log('[Voice] 初始化语音识别...')
      // 检查安全上下文
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        console.warn('[Voice] 非安全上下文，语音识别可能不可用')
        this.$message.warning('当前页面非 HTTPS 或 localhost，语音识别功能受限。请使用 HTTPS 访问。')
      }
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        console.error('[Voice] 当前浏览器不支持 SpeechRecognition API')
        this.$message.error('当前浏览器不支持语音识别，请使用 Chrome/Edge 等现代浏览器')
        return
      }
      console.log('[Voice] SpeechRecognition API 可用')
      this.recognition = new SpeechRecognition()
      this.recognition.lang = 'zh-CN'
      this.recognition.continuous = true
      this.recognition.interimResults = false
      this.recognition.maxAlternatives = 1

      this.recognition.onstart = () => {
        console.log('[Voice] recognition.onstart - 语音识别已启动')
        this.isListening = true
        this.$message.success('语音识别已开启，请说话')
      }

      this.recognition.onend = () => {
        console.log('[Voice] recognition.onend - 语音识别结束')
        this.isListening = false
        // 只有在持续监听标志为 true 且 不是因错误手动停止 时才自动重启
        if (this.continuousListeningEnabled && this.recognition) {
          console.log('[Voice] 自动重启语音识别（continuous模式）')
          setTimeout(() => {
            if (this.continuousListeningEnabled && !this.isListening && this.recognition) {
              console.log('[Voice] 执行自动重启')
              this.recognition.start()
            }
          }, 500)
        }
      }

      this.recognition.onerror = (event) => {
        console.error('[Voice] recognition.onerror - 识别错误:', event.error, event)
        this.isListening = false
        let errorMsg = ''
        let shouldRetry = true

        switch (event.error) {
          case 'not-allowed':
            errorMsg = '麦克风权限被拒绝。请点击地址栏右侧的麦克风图标，允许使用麦克风，然后刷新页面重试。'
            shouldRetry = false
            break
          case 'no-speech':
            errorMsg = '未检测到语音，请确保麦克风工作正常。'
            break
          case 'audio-capture':
            errorMsg = '未找到麦克风设备，请检查硬件连接。'
            shouldRetry = false
            break
          case 'network':
            errorMsg = '语音识别服务网络连接失败。请检查网络是否可访问外网，或尝试使用 HTTPS 部署此页面。'
            shouldRetry = false
            break
          default:
            errorMsg = `语音识别失败 (${event.error})`
        }

        this.$message.error(errorMsg)

        // 如果错误不可恢复（如网络、权限、设备问题），关闭持续监听标志，避免无限重试
        if (!shouldRetry) {
          this.continuousListeningEnabled = false
          // 额外：如果用户手动点击按钮再启动时，会重置该标志
        }
      }

      this.recognition.onresult = (event) => {
        console.log('[Voice] recognition.onresult - 收到识别结果，results数量:', event.results.length)
        const lastResult = event.results[event.results.length - 1]
        const transcript = lastResult[0].transcript
        console.log('[Voice] 识别文本:', transcript)
        if (this.input.trim() !== '') {
          this.input += ' ' + transcript
        } else {
          this.input = transcript
        }
        this.autoResizeTextarea()
      }

      // 可选调试日志
      this.recognition.onaudiostart = () => console.log('[Voice] recognition.onaudiostart')
      this.recognition.onaudioend = () => console.log('[Voice] recognition.onaudioend')
      this.recognition.onsoundstart = () => console.log('[Voice] recognition.onsoundstart')
      this.recognition.onsoundend = () => console.log('[Voice] recognition.onsoundend')
      this.recognition.onspeechstart = () => console.log('[Voice] recognition.onspeechstart')
      this.recognition.onspeechend = () => console.log('[Voice] recognition.onspeechend')

      console.log('[Voice] 语音识别初始化完成')
    },

    async requestMicrophonePermission() {
      console.log('[Voice] 请求麦克风权限...')
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log('[Voice] getUserMedia 成功，获得音轨:', stream.getAudioTracks())
        stream.getTracks().forEach(track => track.stop())
        console.log('[Voice] 临时音轨已释放，权限已授予')
        this.$message.success('麦克风权限已获取，可以开始语音输入')
        return true
      } catch (err) {
        console.error('[Voice] getUserMedia 失败:', err.name, err.message)
        let errorMsg = '无法获取麦克风权限。'
        if (err.name === 'NotAllowedError') {
          errorMsg = '麦克风权限被拒绝。请点击地址栏右侧的麦克风图标，允许使用麦克风，然后刷新页面重试。'
        } else if (err.name === 'NotFoundError') {
          errorMsg = '未检测到麦克风设备，请检查硬件连接。'
        } else {
          errorMsg = `麦克风访问失败: ${err.message || err.name}`
        }
        this.$message.error(errorMsg)
        throw err
      }
    },

    async startContinuousListening() {
      console.log('[Voice] 尝试启动持续语音监听')
      if (!this.recognition) {
        console.error('[Voice] recognition 实例不存在，请检查浏览器兼容性')
        this.$message.error('浏览器不支持语音识别')
        return
      }
      if (this.isListening) {
        console.log('[Voice] 已经在监听中，跳过')
        return
      }
      try {
        await this.requestMicrophonePermission()
        this.continuousListeningEnabled = true
        console.log('[Voice] 调用 recognition.start()')
        this.recognition.start()
      } catch (err) {
        console.error('[Voice] 启动监听失败:', err)
        this.$message.warning('请先通过侧边栏“麦克风设置”按钮允许麦克风权限')
      }
    },

    stopContinuousListening() {
      console.log('[Voice] 停止持续语音监听')
      if (this.recognition && this.isListening) {
        this.recognition.stop()
        this.continuousListeningEnabled = false
        console.log('[Voice] recognition.stop() 已调用')
        this.$message.info('已停止语音输入')
      } else {
        console.log('[Voice] 未处于监听状态，无需停止')
      }
    },

    toggleContinuousListening() {
      console.log('[Voice] 切换语音监听，当前 isListening:', this.isListening)
      if (this.isListening) {
        this.stopContinuousListening()
      } else {
        this.startContinuousListening()
      }
    },

    // ========== 会话管理 ==========
    saveCurrentSession() {
      if (this.messages.length === 0) return
      const firstUserMsg = this.messages.find(m => m.role === 'user')
      if (!firstUserMsg) return
      const session = {
        id: Date.now(),
        question: firstUserMsg.content.substring(0, 50) + (firstUserMsg.content.length > 50 ? '…' : ''),
        time: new Date().toLocaleString(),
        messages: JSON.parse(JSON.stringify(this.messages)),
        type: this.queryMode
      }
      const lastSession = this.historySessions[0]
      if (lastSession && lastSession.question === session.question && lastSession.time === session.time) return
      this.historySessions.unshift(session)
      if (this.historySessions.length > 50) this.historySessions.pop()
      localStorage.setItem('aiChatHistory', JSON.stringify(this.historySessions))
      console.log('[AiChat] 保存会话:', session.question, '模式:', session.type)
    },

    loadHistoryFromStorage() {
      const stored = localStorage.getItem('aiChatHistory')
      if (stored) {
        try {
          this.historySessions = JSON.parse(stored)
          console.log('[AiChat] 加载历史会话数量:', this.historySessions.length)
        } catch (e) { console.error(e) }
      }
    },

    startNewSession() {
      this.currentSessionId = Date.now()
      this.messages = []
      this.streamingMessage = ''
      this.isLoading = false
      this.pptLoading = false
      this.showWelcome = true
      this.pendingSpeech = ''
      if (this.currentAbortController) this.currentAbortController.abort()
      this.scrollToBottom()
      console.log('[AiChat] 开始新会话, sessionId:', this.currentSessionId)
    },

    loadHistorySession(index) {
      const session = this.historySessions[index]
      if (!session) return
      this.messages = JSON.parse(JSON.stringify(session.messages))
      this.messages.forEach(msg => {
        if (msg.role === 'user' && !msg.timestamp) msg.timestamp = Date.now()
        if (msg.role === 'assistant' && !msg.model) msg.model = 'AI助手'
      })
      this.queryMode = session.type
      localStorage.setItem('queryMode', this.queryMode)
      this.currentSessionId = session.id
      this.showWelcome = false
      this.showHistoryDrawer = false
      this.scrollToBottom()
      this.$nextTick(() => this.renderAllCharts())
      this.$message.success(`已加载历史会话，当前模式：${this.queryMode === 'chat' ? '对话模式' : '图表模式'}`)
      console.log('[AiChat] 加载历史会话:', session.question, '消息数:', this.messages.length, '模式:', this.queryMode)
    },

    deleteHistorySession(index) {
      this.$confirm('确定删除该历史会话？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(() => {
          const deleted = this.historySessions[index]
          this.historySessions.splice(index, 1)
          localStorage.setItem('aiChatHistory', JSON.stringify(this.historySessions))
          this.$message.success('已删除')
          if (deleted && deleted.id === this.currentSessionId) {
            this.currentSessionId = Date.now()
            console.log('[AiChat] 删除的会话是当前会话，重置sessionId')
          }
          console.log('[AiChat] 删除历史会话:', deleted?.question)
        })
        .catch(() => {})
    },

    // 推荐会话
    async fetchRecommendedQueries() {
      console.log('[AiChat] 开始获取推荐会话列表')
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('Admin-Token') || ''
        const response = await fetch('/dev-api/ai/recommended/list', {
          method: 'GET',
          headers: { Authorization: 'Bearer ' + token }
        })
        if (response.ok) {
          const result = await response.json()
          if (result.success && Array.isArray(result.data)) {
            this.recommendedList = result.data
            console.log('[AiChat] 推荐会话加载成功，数量:', this.recommendedList.length)
            return
          }
        }
        console.warn('[AiChat] 推荐会话加载失败')
        this.recommendedList = []
      } catch (e) {
        console.error('[AiChat] 推荐会话网络异常', e)
        this.recommendedList = []
      }
    },
    useRecommendedQuery(rec) {
      console.log('[AiChat] 使用推荐会话:', rec.id, rec.title)
      this.showRecommendedDrawer = false
      const query = rec.queryText || rec.displayText || rec.title
      if (!query) {
        this.$message.warning('推荐内容无效')
        return
      }
      if (rec.queryMode && this.queryMode !== rec.queryMode) {
        this.queryMode = rec.queryMode
        localStorage.setItem('queryMode', this.queryMode)
        console.log('[AiChat] 推荐项切换模式为:', rec.queryMode)
      }
      if (rec.model && this.selectedModel !== rec.model) {
        this.selectedModel = rec.model
        localStorage.setItem('preferredModel', this.selectedModel)
        console.log('[AiChat] 推荐项切换模型为:', rec.model)
      }
      this.clearWelcome()
      this.input = query
      this.send()
    },

    // PPT 生成
    isPPTRequest(text) {
      const keywords = ['生成ppt', '制作ppt', '生成幻灯片', '生成演示文稿', '生成报告', '制作报告', '做一份报告', '帮我生成ppt', '帮我做ppt']
      const lowerText = text.toLowerCase()
      const matched = keywords.some(kw => lowerText.includes(kw))
      if (matched) console.log('[AiChat] 检测到 PPT 生成需求:', text)
      return matched
    },
    async generatePPT(userInput, modelUsed) {
      if (this.pptLoading) {
        console.warn('[PPT] PPT 正在生成中，忽略重复请求')
        return
      }
      this.pptLoading = true
      console.log('[PPT] 开始生成 PPT，模型:', modelUsed, '需求:', userInput)

      const isDeepSeek = modelUsed.startsWith('deepseek')
      const provider = isDeepSeek ? 'deepseek' : 'dashscope'
      const url = '/dev-api/ai/multimodal/ppt/generate'

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: userInput, provider, model: modelUsed })
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const blob = await response.blob()
        const downloadUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = 'report.pptx'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(downloadUrl)

        this.$message.success('PPT 生成成功，开始下载')
        console.log('[PPT] 生成成功，文件已下载')

        this.messages.push({
          role: 'assistant',
          content: `📄 已根据您的要求生成 PPT 报告，文件已自动下载。\n\n需求：${userInput.substring(0, 100)}${userInput.length > 100 ? '…' : ''}`,
          model: modelUsed
        })
        this.scrollToBottom()
        this.input = ''
      } catch (error) {
        console.error('[PPT] 生成失败', error)
        this.$message.error('PPT 生成失败，请稍后重试')
      } finally {
        this.pptLoading = false
      }
    },

    // 发送入口
    async send() {
      if (this.isLoading || this.pptLoading) {
        this.$message.warning('正在处理中，请稍后')
        return
      }
      const userInput = this.input.trim()
      if (!userInput) return

      if (this.isPPTRequest(userInput)) {
        console.log('[AiChat] 识别为 PPT 需求，跳过对话/图表流程')
        await this.generatePPT(userInput, this.selectedModel)
        return
      }

      this.clearWelcome()
      const currentTimestamp = Date.now()
      const currentModel = this.selectedModel

      this.messages.push({
        role: 'user',
        content: userInput,
        type: this.queryMode,
        timestamp: currentTimestamp
      })
      this.input = ''
      this.autoResizeTextarea()
      this.scrollToBottom()

      this.isLoading = true
      this.streamingMessage = ''
      this.currentAbortController = new AbortController()
      this.pendingSpeech = ''

      try {
        if (this.queryMode === 'chart') {
          await this.handleChartQuery(userInput, currentModel)
        } else {
          await this.handleChatQuery(userInput, currentModel)
        }
        this.saveCurrentSession()
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('[AiChat] 用户主动停止生成')
          if (this.streamingMessage && this.streamingMessage !== '🤔 正在分析您的问题...') {
            this.messages.push({ role: 'assistant', content: this.streamingMessage + '\n\n[已停止]', model: currentModel })
          }
        } else {
          console.error('[AiChat] 处理失败', error)
          this.$message.error('处理失败，请稍后重试')
        }
      } finally {
        this.isLoading = false
        this.streamingMessage = ''
        this.currentAbortController = null
        this.scrollToBottom()
      }
    },

    // 对话模式（流式+实时语音）
    async handleChatQuery(userInput, modelUsed) {
      const isDeepSeek = modelUsed.startsWith('deepseek')
      const provider = isDeepSeek ? 'deepseek' : 'dashscope'
      const url = '/dev-api/ai/chat'
      const headers = { 'Content-Type': 'application/json' }
      const token = localStorage.getItem('token') || localStorage.getItem('Admin-Token')
      if (token) headers.Authorization = 'Bearer ' + token
      const body = JSON.stringify({ content: userInput, provider, model: modelUsed, stream: true })

      const response = await fetch(url, { method: 'POST', headers, body, signal: this.currentAbortController.signal })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = '', fullAnswer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (let line of lines) {
          line = line.trim()
          if (!line) continue
          while (line.startsWith('data:')) line = line.slice(5).trim()
          if (line === '[DONE]') {
            reader.cancel()
            this.messages.push({ role: 'assistant', content: fullAnswer, model: modelUsed })
            console.log('[AiChat] 对话流式完成，总长度:', fullAnswer.length)
            if (this.pendingSpeech.trim() && this.voiceReplyEnabled) this.speakText(this.pendingSpeech)
            this.pendingSpeech = ''
            return
          }
          try {
            const parsed = JSON.parse(line)
            const delta = parsed.content || parsed.choices?.[0]?.delta?.content || parsed.message?.content || ''
            if (delta) {
              fullAnswer += delta
              this.streamingMessage = fullAnswer
              this.scrollToBottom()
              this.speakRealTime(delta)
            }
          } catch (e) {}
        }
      }
      if (fullAnswer) {
        this.messages.push({ role: 'assistant', content: fullAnswer, model: modelUsed })
        if (this.pendingSpeech.trim() && this.voiceReplyEnabled) this.speakText(this.pendingSpeech)
      }
    },

    // 图表模式
    async handleChartQuery(userInput, modelUsed) {
      this.streamingMessage = '🤔 正在分析您的问题...'
      this.scrollToBottom()

      const url = '/dev-api/ai/nl2sql/query'
      const headers = { 'Content-Type': 'application/json' }
      const token = localStorage.getItem('token') || localStorage.getItem('Admin-Token')
      if (token) headers.Authorization = 'Bearer ' + token

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({ content: userInput, model: modelUsed }),
          signal: this.currentAbortController.signal
        })
        const result = await response.json()
        console.log('[Chart] 后端响应:', result)

        const assistantMsg = {
          role: 'assistant',
          type: 'chart',
          model: modelUsed,
          insightLoading: false,
          showInsight: false,
          insight: '',
          sqlExecuted: result.sqlExecuted,
          showSql: false,
          data: null,
          chartOption: null
        }

        if (result.success) {
          assistantMsg.data = result.data || []
          if (result.chartConfig && result.chartConfig.echartsOption) {
            const option = JSON.parse(JSON.stringify(result.chartConfig.echartsOption))
            option.color = this.chartColorPalette
            assistantMsg.chartOption = option
            assistantMsg.desc = `📊 ${result.chartConfig.chartTitle || '智能图表'}`
          } else {
            assistantMsg.desc = `📊 查询结果（共 ${result.data?.length || 0} 行）`
          }
        } else {
          assistantMsg.errorMessage = result.errorMessage || '查询失败'
        }
        this.messages.push(assistantMsg)
      } catch (e) {
        console.error('[Chart] 请求异常', e)
        this.messages.push({
          role: 'assistant',
          type: 'chart',
          errorMessage: '网络错误或后端服务异常',
          model: modelUsed,
          insightLoading: false,
          showInsight: false,
          insight: '',
          data: null,
          chartOption: null
        })
      }
      this.$nextTick(() => this.renderAllCharts())
    },

    // 洞察报告
    hasDataForInsight(msg) {
      if (msg.errorMessage) return false
      if (msg.data && msg.data.length > 0) return true
      if (msg.chartOption && msg.chartOption.series && msg.chartOption.series[0] && msg.chartOption.series[0].data.length > 0) return true
      return false
    },
    buildDataSummary(msg) {
      if (msg.data && msg.data.length) {
        return `数据行数: ${msg.data.length}\n完整数据:\n${JSON.stringify(msg.data, null, 2)}`
      }
      if (msg.chartOption) {
        const series = msg.chartOption.series || []
        const dataPoints = series.flatMap(s => s.data || [])
        return `图表类型: ${series[0]?.type || '未知'}\n数据点数量: ${dataPoints.length}\n数据点: ${JSON.stringify(dataPoints)}`
      }
      return ''
    },
    async generateInsight(msg, idx) {
      if (msg.insightLoading) return
      console.log(`[Insight] 开始为消息索引 ${idx} 生成洞察报告`)
      this.$set(msg, 'insightLoading', true)
      this.$set(msg, 'showInsight', true)

      const dataSummary = this.buildDataSummary(msg)
      const requestBody = {
        dataSummary: dataSummary,
        dimensions: ['TREND', 'COMPARISON', 'DISTRIBUTION', 'ANOMALY', 'CORRELATION', 'CLUSTERING', 'FORECASTING', 'PERIODICITY', 'FUNNEL', 'PARETO', 'SENSITIVITY'],
        model: msg.model || this.selectedModel
      }

      try {
        const response = await fetch('/dev-api/ai/insight/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })
        const result = await response.json()
        console.log('[Insight] 后端响应:', result)
        if (result.success) {
          this.$set(msg, 'insight', result.insight)
          this.$set(msg, 'insightModel', requestBody.model)
        } else {
          this.$set(msg, 'insight', `生成洞察失败：${result.errorMessage}`)
          this.$message.error('洞察生成失败')
        }
      } catch (error) {
        console.error('[Insight] 请求异常', error)
        this.$set(msg, 'insight', '生成洞察报告时发生网络错误')
        this.$message.error('网络异常')
      } finally {
        this.$set(msg, 'insightLoading', false)
      }
    },
    closeInsight(idx) {
      this.$set(this.messages[idx], 'showInsight', false)
    }
  }
}
</script>

<style scoped>
/* 整体布局 */
.ai-chat-layout {
  display: flex;
  height: calc(100vh - 84px);
  background-color: #f5f7fa;
}
.main-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sidebar {
  width: 80px;
  background-color: white;
  border-left: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  order: 2;
}
.sidebar-label {
  font-size: 12px;
  color: #606266;
  margin-bottom: -4px;
}
.sidebar-select {
  width: 60px;
  margin: 0 auto;
}
.sidebar .el-button {
  margin: 0;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
.message {
  margin-bottom: 16px;
  display: flex;
  position: relative;
}
.message.user {
  justify-content: flex-end;
}
.message.user .content {
  background-color: #e4e7ed;
  color: #1e1e1e;
  border-radius: 12px 12px 4px 12px;
}
.message.assistant .content {
  background-color: white;
  color: #303133;
  border-radius: 12px 12px 12px 4px;
  border: 1px solid #e4e7ed;
  max-width: 85%;
}
.welcome-message .content {
  max-width: 90%;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border-left: 3px solid #67c23a;
}
.content {
  font-size: 14px;
  line-height: 1.6;
  padding: 10px 90px 10px 16px;
  position: relative;
}
.message-meta {
  font-size: 12px;
  color: #909399;
}
.message-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  z-index: 10;
}
.message.user .message-actions .el-button {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #1e1e1e;
  padding: 4px 6px;
  border: none;
}
.message.user .message-actions .el-button:hover {
  background: rgba(0, 0, 0, 0.2);
}
.message.assistant .message-actions .el-button {
  background: rgba(0,0,0,0.08);
  border-radius: 4px;
  color: #606266;
  padding: 4px 6px;
}
.table-chart-layout {
  display: flex;
  gap: 24px;
  align-items: stretch;
  margin: 16px 0;
  flex-wrap: wrap;
}
.table-wrapper {
  flex: 1.2;
  min-width: 200px;
  height: 400px;
  background: #ffffff;
  border-radius: 12px;
  overflow-y: auto;
}
.table-wrapper .el-table {
  height: 100%;
}
.chart-wrapper {
  flex: 1;
  min-width: 250px;
  height: 400px;
  background: #ffffff;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: flex-end;
}
.echarts-box {
  width: 100%;
  height: 100%;
}
.sql-info {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #dcdfe6;
}
.sql-text {
  margin-top: 8px;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
}
.insight-report {
  margin-top: 12px;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #409eff;
  font-size: 13px;
}
.insight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  margin-bottom: 8px;
  color: #409eff;
}
.insight-content {
  font-size: 13px;
  line-height: 1.5;
  color: #303133;
}
.empty-text {
  text-align: center;
  color: #909399;
  padding: 20px;
}
.error-text {
  color: #f56c6c;
}
.chat-input-wrapper {
  background-color: white;
  border-top: 1px solid #e4e7ed;
  padding: 12px 20px;
}
.input-container {
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  background-color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-container.focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64,158,255,0.2);
}
.custom-textarea {
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  padding: 12px 60px 12px 20px;
  font-family: inherit;
  background: transparent;
  max-height: 200px;
  min-height: 120px;
}
.input-toolbar {
  position: absolute;
  right: 12px;
  bottom: 10px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.send-btn, .voice-btn, .stop-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  transition: all 0.2s;
  cursor: pointer;
}
.send-btn {
  color: #909399;
}
.send-btn.active {
  color: #409eff;
}
.send-btn.active:hover {
  background-color: rgba(64,158,255,0.1);
  transform: scale(1.05);
}
.voice-btn {
  color: #67c23a;
}
.voice-btn.voice-active {
  color: #67c23a;
}
.voice-btn.voice-muted {
  color: #f56c6c;
  position: relative;
}
.voice-btn.voice-muted::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 2px;
  background-color: #f56c6c;
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 2px;
}
.voice-btn:hover {
  background-color: rgba(0,0,0,0.05);
  transform: scale(1.05);
}
.stop-btn {
  color: #f56c6c;
}
.stop-btn:hover {
  background-color: rgba(245,108,108,0.1);
  transform: scale(1.05);
}
.voice-status {
  font-size: 12px;
  color: #67c23a;
  text-align: right;
  margin-top: 4px;
  padding-right: 12px;
}
.history-list {
  padding: 8px 12px;
}
.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 8px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}
.history-info {
  flex: 1;
  overflow: hidden;
}
.history-question {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.history-time {
  font-size: 11px;
  color: #909399;
  margin-top: 4px;
}
.history-delete {
  color: #f56c6c;
  font-size: 16px;
  padding: 4px;
}
.recommended-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}
.recommended-item {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border: 1px solid #e9ecef;
}
.recommended-title {
  font-size: 14px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 6px;
}
.recommended-desc {
  font-size: 12px;
  color: #606266;
}
</style>
