const App = {
    data() {
        let numItems = 6;
        let endMarkerIndex = Math.floor(numItems * .75);

        let texts = Array.from({ length: numItems }).fill(String.fromCodePoint(0x1F34E));
        let rootItems = texts.map((ele, i) => (
            {
                text: ele,
                isEndMarker: i === endMarkerIndex
            }
        ));


        return {
            message: 'Hello Vue!!',
            items: rootItems
        }
    },
    methods: {
        prepend() {
            this.items.unshift(...Array.from({ length: 10 }).fill(String.fromCodePoint(0x1F34E)));
        },
        append() {
            this.items.shift(...Array.from({ length: 10 }).fill(String.fromCodePoint(0x1F34E)));
        },
        getScrollingElement() {
            return document.scrollingElement;
        },
        saveScrollPosition() {
            console.log(this.$el.parentElement.scrollTop)
            console.log(this.$el.parentElement.scrollHeight)
        },
        cloneItems() {
            this.items.unshift(...this.items);
        },
        handleScroll() {
            /*
            if almost out of track
            lay track ahead or behind
            */
            let rootEle = this.getScrollingElement();
            const shiftThreshhold = .8; // % of scroll height where we lay more track
            const numToShift = this.items.length / 2;
            if (rootEle.scrollTop > (rootEle.scrollHeight * shiftThreshhold)) {
                this.scrollToStart();
                //addBelow();
                // const itemsToShift = this.items.slice(0, numToShift);
                // // shift top half to bottom half
                // this.items.push(...itemsToShift);
                // this.$nextTick(function () {
                //     this.items.splice(0, numToShift);
                // });
            }

            function addBelow() {
                //rootEle.scrollTop = 3249;
                this.scrollToStart();
            };
        },
        scrollToStart() {
            // scroll to the 1st root item (middle item after cloning)
            const startIndex = this.items.length / 2;
            let startItemEle = this.$refs.items[startIndex];
            startItemEle.scrollIntoView();
        }
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    mounted() {
        // this.observer = new IntersectionObserver(entries => {
        //     entries.forEach(e => console.log('seent it'));
        // });

        // this.observer.observe(document.querySelector('.endMarker'));
        // this.$nextTick(function () {
        //     let rootEle = this.getScrollingElement();
        //     const startingHeight = rootEle.scrollHeight;
        //     this.cloneItems();
        //     setTimeout(() => {
        //         rootEle.scrollTop = rootEle.scrollHeight - startingHeight;
        //     });
        // });

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