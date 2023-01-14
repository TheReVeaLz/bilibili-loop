if (!(!!document.getElementById('loopBtn'))) {
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    var loopState = true;
    var target = document.querySelector('.left-container-under-player');
    var infoTab = document.createElement('div');
    infoTab.classList.add('up-info-v1', 'up-info-v1-ab');
    var infoPanel = document.createElement('div');
    infoPanel.classList.add('btn-panel');
    var loopBtn = document.createElement('div');
    loopBtn.classList.add('default-btn', 'old-charge-btn', 'btn-transition', 'not-follow-charge-btn');
    loopBtn.id = "loopBtn";
    loopBtn.innerHTML = "Loop ON";
    loopBtn.onclick = function() {
        if (loopState) {
            loopState = false;
            loopBtn.innerHTML = "Loop OFF"
        } else {
            loopState = true;
            loopBtn.innerHTML = "Loop ON"
        }
    };
    target.insertBefore(infoTab, target.children[0]);
    infoTab.appendChild(infoPanel).appendChild(loopBtn);

    async function LoopInit() {
        var vid = document.querySelector('bwp-video');
        var cTime = vid.currentTime;
        vid.currentTime = vid.duration;
        await waitForElm('.bpx-player-ending');
        vid.currentTime = cTime;
        vid.play();
        vid.onpause = function() {
            if (loopState) {
                vid.play();
            }
        };
        vid.onended = function() {
            if (loopState) {
                document.querySelector('[data-action="restart"]').click();
            }
        };
    }
    LoopInit();
};
