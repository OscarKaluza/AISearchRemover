chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    if (!details.url.includes("google")) return;

    const url = new URL(details.url);

    function craftNewQuery() {
      if (details.url.includes("/search?q=")) {
        const searchQuery = url.searchParams.get("q");
        if (!searchQuery.includes("-ai")) {
          return `${searchQuery} -ai`;
        }
      }
      return null;
    }

    const newQuery = craftNewQuery();
    if (!newQuery) return; 

    url.searchParams.set("q", newQuery);
    chrome.tabs.update(details.tabId, {
        url: url.toString(),
      });
  },
);