console.log('mesffdfsage')
chrome.commands.onCommand.addListener((command) => {
    if (command === 'copy-all') {
        getCurrentTab().then((tabId) => {
            chrome.tabs.sendMessage(tabId, {action: 'copy-all'},
            (allCode) => {
                console.log(allCode)
            }
            )
        })
    }
  });

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab?.id;
  }
