import { getNotificationStats, readNotifications } from '../../api/notification'
const state = {
    unreadCount: 0
}
var getters = {
    unreadCount: (state) => state.unreadCount
}
const actions = {
    async updateUnreadCount({ commit, getters }, params = {}) {
        if (!getters.isLoggedIn) {
            return
        }

        const statsResponse = await getNotificationStats({}, false)
        commit('setUnreadCount', statsResponse.data.unread_count)
    },
    async readNotifications({ commit }, params = {}) {
        await readNotifications()
        commit('setUnreadCount', 0)
    }
}

const mutations = {
    setUnreadCount(state, count) {
        state.unreadCount = count
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
