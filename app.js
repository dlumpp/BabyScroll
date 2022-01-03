const App = {
    data() {

        function range(start, end) {
            return Array.from({ length: end - start + 1 }, (_, i) => start + i)
        }

        function chooseAtRandom(arr){
            const randIndex = Math.floor(Math.random() * arr.length);
            return arr[randIndex];
        }

        function chooseManyAtRandom(arr, num){
            let choices = [];
            for (let index = 0; index < num; index++) {
                choices.push(chooseAtRandom(arr));                
            }  
            return choices;  
        }

        const numItems = 8;

        //https://www.w3schools.com/charsets/ref_emoji.asp
        const foodAndNatureCodePoints = range(0x1F32D, 0x1F374);
        const codePoints = chooseManyAtRandom(foodAndNatureCodePoints, numItems);

        let rootItems = codePoints.map((ele) => (
            {
                text: String.fromCodePoint(ele)
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