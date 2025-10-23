function waitForElement(selector, set, callback) {
  const observer = new MutationObserver((mutations) => {
    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
      let url = elements[i].getAttribute('src')
      if (!set.has(url)) {
        set.add(url)
        observer.disconnect();
        callback(url)
        waitForElement(selector, set, callback)
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  observers.push(observer)

  return observer
}

function onUrlChange(callback) {
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      for (let i = 0; i < observers.length; i++) {
        observers[i].disconnect();
      }
      observers = [];
      callback(location.href);
    }
  });
  
  observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
  });
}

function handlePage() {
  waitForElement('iframe[allow*="clipboard-write"]', new Set(), (link) => {
    window.open(link)
  });
}

let lastUrl = location.href;
let observers = [];

handlePage();
onUrlChange((newUrl) => {
  handlePage();
});