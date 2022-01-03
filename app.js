const App = {
    data() {
        let numItems = 8;
        let endMarkerIndex = Math.floor(numItems * .75);

        let texts = Array.from({ length: numItems }).fill(String.fromCodePoint(0x1F34E));
        let rootItems = texts.map((ele, i) => (
            {
                text: ele,
                isEndMarker: i === endMarkerIndex
            }
        ));

        return {
            items: rootItems
        }
    },
    methods: {
        getScrollingElement() {
            return document.scrollingElement;
        },
        cloneItems() {
            this.items.unshift(...this.items);
        },
        handleScroll() {
            let rootEle = this.getScrollingElement();
            const shiftThreshhold = .8; // % of scroll height where we lay more track
            const numToShift = this.items.length / 2;
            if (rootEle.scrollTop > (rootEle.scrollHeight * shiftThreshhold)) {
                this.scrollToStart();
            }
        },
        scrollToStart() {
            // scroll to the 1st root item (middle item after cloning)
            const startIndex = this.items.length / 2;
            let startItemEle = this.$refs.items[startIndex];
            startItemEle.scrollIntoView();
        }
    },
    created() {
        window.addEventListener("scroll", () => {
            window.requestAnimationFrame(this.handleScroll);
        });
    },
    mounted() {

        this.$nextTick(function () {
            this.cloneItems();
            setTimeout(() => {
                //doesn't work wo setTimeout. not sure why. https://stackoverflow.com/a/55488834/6753705
                this.scrollToStart();
            });
        });
    }
}

Vue.createApp(App).mount('#app')