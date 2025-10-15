<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-10 px-4">
    <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          🛫 AirAsia Popup Ad Test
        </h1>
        <p class="text-gray-600">Campaign: W14-Oct HC | Zone ID: 568</p>
      </div>

      <!-- Alert -->
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              <strong class="font-medium">Troubleshooting Tips:</strong><br>
              1. Check if popup blocker is enabled<br>
              2. Clear cookies and reload<br>
              3. The popup might appear on scroll or after delay<br>
              4. Try moving mouse to top of browser (exit intent)
            </p>
          </div>
        </div>
      </div>

      <!-- Info Box -->
      <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
        <h3 class="text-indigo-800 font-semibold mb-2">Test Configuration</h3>
        <p class="text-sm text-gray-700">
          <strong>Zone ID:</strong> <code class="bg-indigo-100 px-2 py-1 rounded">568</code><br>
          <strong>Revive ID:</strong> <code class="bg-indigo-100 px-2 py-1 rounded">2d10743d9880200bf17a894cfa35dba0</code><br>
          <strong>Server:</strong> <code class="bg-indigo-100 px-2 py-1 rounded">adservermsa.gpas.co</code>
        </p>
      </div>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Ad Container -->
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 min-h-[400px] relative">
          <span class="absolute top-3 left-3 text-xs font-semibold text-gray-400">
            Ad Container
          </span>
          
          <!-- GPAS Revive Ad Tag -->
          <ins 
            data-revive-zoneid="568" 
            data-revive-id="2d10743d9880200bf17a894cfa35dba0"
          />
        </div>

        <!-- Debug Panel -->
        <div class="border-2 border-gray-300 rounded-lg p-6 bg-gray-100 min-h-[400px]">
          <h3 class="text-gray-800 font-semibold mb-4 text-lg">
            🔍 Debug Console
          </h3>
          
          <!-- Status -->
          <div 
            :class="[
              'mb-4 p-3 rounded-lg text-sm font-medium',
              statusClass
            ]"
          >
            {{ statusMessage }}
          </div>

          <!-- Log Container -->
          <div class="max-h-[300px] overflow-y-auto space-y-2">
            <div 
              v-for="(log, index) in logs" 
              :key="index"
              :class="[
                'p-2 bg-white rounded text-xs font-mono border-l-4',
                log.type === 'error' ? 'border-red-500' :
                log.type === 'warning' ? 'border-yellow-500' :
                log.type === 'success' ? 'border-green-500' :
                'border-indigo-500'
              ]"
            >
              <span class="text-gray-500 mr-2">[{{ log.time }}]</span>
              <span>{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap gap-3">
        <button 
          @click="reloadPage"
          class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
        >
          🔄 Reload Test
        </button>
        <button 
          @click="clearCookies"
          class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
        >
          🍪 Clear Cookies
        </button>
        <button 
          @click="checkPopupBlocker"
          class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
        >
          🚫 Check Popup Blocker
        </button>
        <button 
          @click="inspectAdContent"
          class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
        >
          🔎 Inspect Ad Content
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
interface Log {
  time: string;
  message: string;
  type: 'info' | 'error' | 'warning' | 'success';
}

// SEO & Meta
useHead({
  title: 'AirAsia Popup Test - W14-Oct HC',
  script: [
    {
      src: '//adservermsa.gpas.co/www/delivery/asyncjs.php',
      async: true,
    }
  ]
});

// Reactive state
const logs = ref<Log[]>([]);
const statusMessage = ref('⏳ Initializing...');
const statusType = ref<'loading' | 'success' | 'error'>('loading');
let checkCount = 0;
const maxChecks = 30;
let adCheckInterval: NodeJS.Timeout | null = null;

// Computed
const statusClass = computed(() => {
  switch (statusType.value) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
});

// Methods
const addLog = (message: string, type: Log['type'] = 'info') => {
  const time = new Date().toLocaleTimeString();
  logs.value.unshift({ time, message, type });
  
  // Keep only last 50 logs
  if (logs.value.length > 50) {
    logs.value.pop();
  }
};

const updateStatus = (message: string, type: 'loading' | 'success' | 'error' = 'loading') => {
  statusMessage.value = message;
  statusType.value = type;
};

const checkAdLoaded = () => {
  checkCount++;
  const insElement = document.querySelector('ins[data-revive-zoneid="568"]');

  if (insElement && (insElement.innerHTML.trim() !== '' || insElement.children.length > 0)) {
    updateStatus('✓ Ad loaded successfully!', 'success');
    addLog('Ad content detected in container', 'success');
    addLog(`Ad HTML length: ${insElement.innerHTML.length} characters`, 'info');
    
    // Check for iframes or scripts
    const iframes = insElement.querySelectorAll('iframe');
    const scripts = insElement.querySelectorAll('script');
    
    if (iframes.length > 0) {
      addLog(`Found ${iframes.length} iframe(s) - popup might be loading inside`, 'info');
    }
    if (scripts.length > 0) {
      addLog(`Found ${scripts.length} script(s) - checking for popup logic`, 'info');
    }

    monitorForPopups();
    return true;
  } else if (checkCount >= maxChecks) {
    updateStatus('⚠ Ad did not load', 'error');
    addLog('Timeout: No ad content detected after 15 seconds', 'error');
    addLog('Possible reasons:', 'warning');
    addLog('1. No ad inventory available', 'warning');
    addLog('2. Popup blocker is active', 'warning');
    addLog('3. Geographic targeting restrictions', 'warning');
    return false;
  }
  return null;
};

const monitorForPopups = () => {
  addLog('Monitoring for popups/modals...', 'info');
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const element = node as HTMLElement;
          const style = window.getComputedStyle(element);
          if (style.position === 'fixed' || style.position === 'absolute') {
            const zIndex = parseInt(style.zIndex);
            if (zIndex > 1000) {
              addLog(`⚠️ POPUP DETECTED! High z-index element (${zIndex})`, 'success');
              updateStatus('🎉 Popup detected!', 'success');
            }
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  addLog('DOM mutation observer active', 'info');
};

const checkPopupBlocker = () => {
  addLog('Testing popup blocker...', 'info');
  const testPopup = window.open('', '_blank', 'width=1,height=1');
  
  setTimeout(() => {
    if (!testPopup || testPopup.closed || typeof testPopup.closed === 'undefined') {
      addLog('⚠️ POPUP BLOCKER IS ENABLED!', 'error');
      alert('Popup blocker is ENABLED! Please disable it and reload.');
    } else {
      testPopup.close();
      addLog('✓ Popup blocker is not blocking', 'success');
      alert('Popup blocker is not blocking. The issue might be elsewhere.');
    }
  }, 1000);
};

const clearCookies = () => {
  if (process.client) {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    addLog('Cookies cleared', 'success');
    alert('Cookies cleared! Reloading page...');
    setTimeout(() => location.reload(), 1000);
  }
};

const inspectAdContent = () => {
  const insElement = document.querySelector('ins[data-revive-zoneid="568"]');
  if (insElement) {
    addLog('=== AD CONTENT INSPECTION ===', 'info');
    addLog(`Inner HTML length: ${insElement.innerHTML.length}`, 'info');
    addLog(`Children count: ${insElement.children.length}`, 'info');
    
    console.log('Full ad HTML:', insElement.innerHTML);
    addLog('Full HTML logged to browser console (F12)', 'info');
    
    // Check for common popup triggers
    if (insElement.innerHTML.includes('window.open')) {
      addLog('⚠️ Found window.open() in ad code', 'warning');
    }
    if (insElement.innerHTML.includes('modal') || insElement.innerHTML.includes('popup')) {
      addLog('⚠️ Found "modal" or "popup" keywords in ad', 'warning');
    }
  } else {
    addLog('No ad content found to inspect', 'error');
  }
};

const reloadPage = () => {
  if (process.client) {
    location.reload();
  }
};

// Lifecycle
onMounted(() => {
  addLog('Test page initialized', 'info');
  addLog('Waiting for ad to load...', 'info');

  // Start monitoring ad loading
  adCheckInterval = setInterval(() => {
    const result = checkAdLoaded();
    if (result !== null && adCheckInterval) {
      clearInterval(adCheckInterval);
    }
  }, 500);

  // Monitor scroll
  let hasScrolled = false;
  window.addEventListener('scroll', () => {
    if (!hasScrolled) {
      hasScrolled = true;
      addLog('User scrolled - checking for scroll-triggered popup', 'info');
    }
  });

  // Monitor exit intent
  document.addEventListener('mouseleave', (e: MouseEvent) => {
    if (e.clientY < 0) {
      addLog('Exit intent detected (mouse left viewport)', 'info');
    }
  });

  // Delayed checks
  setTimeout(() => {
    addLog('5 second delay passed - checking for delayed popup', 'info');
  }, 5000);

  setTimeout(() => {
    addLog('10 second delay passed', 'info');
  }, 10000);
});

onBeforeUnmount(() => {
  if (adCheckInterval) {
    clearInterval(adCheckInterval);
  }
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>