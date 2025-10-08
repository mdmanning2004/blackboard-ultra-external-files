function waitForElement(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    const element = document.querySelector(selector);
    if (element) {
      observer.disconnect();
      callback(element);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return observer
}

function onUrlChange(callback) {
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      callback(location.href);
    }
  });
  
  observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
  });
}

function handlePage() {
  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
  }

  currentObserver = waitForElement('iframe[allow*="clipboard-write"]', (element) => {
    const link = element.getAttribute("src")
    window.open(link)
  });
}

let lastUrl = location.href;
let currentObserver = null;

// On first load
handlePage();
onUrlChange((newUrl) => {
  handlePage();
});