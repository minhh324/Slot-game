let screen = document.getElementById("screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let spin_button = document.getElementById("spin_button");
let stop_button = document.getElementsByClassName("stop_button");

let sec = 100;
let stopReelFlag = [];
let reelCounts = [];
let slotFrameHeight;
let slotReelsHeight;
let slotReelsItemHeight;
let slotReelStartHeight;

let slot = {
    init: function () {
        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },

    start: function () {
        slot.init();
        for (let index = 0; index < 3; index++) {
            slot.animation(index);
        }
    },

    stop: function (index) {
        stopReelFlag[index] = true;
        if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
            spin_button.removeAttribute("disabled");
            for (let i = 0; i < stop_button.length; i++) {
                stop_button[i].setAttribute("disabled", true);
            }
        }
    },

    resetlocationInfo: function () {
        slotFrameHeight = screen.offsetHeight;
        slotReelsHeight = reels[0].offsetHeight;
        slotReelsItemHeight = reel[0].offsetHeight;
        slotReelStartHeight = -slotReelsHeight;
        slotReelStartHeight += slotFrameHeight;
        -(slotFrameHeight / 2) + slotReelsItemHeight * 3 / 2;
        for (let i = 0; i < reels.length; i++) {
            reels[i].style.top = String(slotReelStartHeight) + "px";
        }
    },

    animation: function (index) {
        if (reelCounts[index] >= 8) {
            reelCounts[index] = 0;
        }
        $(".reels").eq(index).animate({
            "top": slotReelStartHeight + (reelCounts[index] * slotReelsItemHeight)
        },
            {
                duration: sec,
                easing: "linear",
                complete: function () {
                    if (stopReelFlag[index]) {
                        return;
                    }
                    reelCounts[index]++;
                    slot.animation(index);
                }
            });
    }
};

window.onload = function () {
    slot.init();
    slot.resetlocationInfo();

    for (let i = 0; i < stop_button.length; i++) {
        stop_button[i].addEventListener("click", function () {
            slot.stop(i);
            this.setAttribute("disabled", true);
        }, false);
    }

    spin_button.addEventListener("click", function (e) {
        e.target.setAttribute("disabled", true);
        slot.start();
        for (let i = 0; i < stop_button.length; i++) {
            stop_button[i].removeAttribute("disabled");
        }
    });
};





