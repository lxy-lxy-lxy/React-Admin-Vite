import axios from '@services/axios';
import {faker} from '@faker-js/faker';

const tableData = '/devTool/table'

const getTable = (size) => {
        const list = new Array(size).fill(null).map(() => ({
                id: faker.string.uuid(),
                number: faker.number.int(),
                title: faker.commerce.productName(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.recent().toISOString(),
                status: faker.helpers.arrayElement(['open', 'closed', 'processing']),
                labels: new Array(faker.helpers.arrayElement([1, 2]))
                        .fill(null)
                        .map(() => ({
                                name: faker.commerce.productAdjective(),
                                color: faker.color.rgb()
                        }))
        }));
        return {
                list,
                total: 555
        };
}

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
                        .get(tableData, {params, mock: getTable(params.pageSize)})
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