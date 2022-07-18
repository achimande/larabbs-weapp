export default {
    data: {
        page: 1,
        resourceData: [],
        noMoreData: false,
        isLoading: false
    },
    async onPullDownRefresh() {
        this.page = 1
        this.noMoreData = false
        await this.loadData(true)
        wx.stopPullDownRefresh()
    },
    async onReachBottom() {
        if (this.noMoreData || this.isLoading) {
            return
        }
        this.isLoading = true
        this.page += 1
        await this.loadData()
        this.isLoading = false
    },
    methods: {
        async loadData(reset = false) {
            const dataResponse = await this.fetchData()
            this.resourceData = reset ? dataResponse.data.data : this.resourceData.concat(dataResponse.data.data)
            const pagination = dataResponse.data.meta
            if (pagination.current_page === pagination.last_page) {
                this.noMoreData = true
            }
        }
    }
}
