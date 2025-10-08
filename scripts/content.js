function waitForElement(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }

  // Watch for it to appear
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

waitForElement('iframe[allow="clipboard-write *"]', (element) => {
  console.log('Found it!', element);
  const link = element.getAttribute("src")
  console.log(link)
});