import axios from '@services/axios';

const tableData = '/tableTool/getTableList'

export const createTableStore = (set) => ({
        table: {
                loading: false,
                list: [],
                total: 0,
                searchParams: {}
        },
        getTableData: async (params) => {
                set((state) => {
                        state.table.loading = true
                        state.table.searchParams = params
                })
                const {total, list} = await axios
                        .get(tableData, {params})
                        .finally(() => {
                                set((state) => {
                                        state.table.loading = false
                                })
                        })
                set({
                        table: {
                                loading: false,
                                list,
                                total,
                                searchParams: params
                        }
                })
        }
})