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
  waitForElement('iframe[allow*="clipboard-write"]', (element) => {
    console.info('Found iframe on this page');
    const link = element.getAttribute("src")
    console.info(link)
    window.open(link)
  });
}

let lastUrl = location.href;

// On first load
handlePage();
onUrlChange((newUrl) => {
  console.log('URL changed to:', newUrl);
  handlePage();
});