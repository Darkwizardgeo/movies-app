import { getStudios, getMovies } from '../../services/dataProvider'

global.fetch = () => Promise.resolve( {
    json: () => Promise.resolve({
        value:{}
    })
})

describe('Test Api Module Calls: ', () => {

    it('Test movies fetch: ', () => {
        const movieResult = getMovies(jest.fn())
        expect(movieResult).toMatchObject({});
    })

    it('Test studios fetch: ', () => {
        const studiosResult = getStudios(jest.fn(() => ({ studios: 1 })))
        expect(studiosResult).toMatchObject({});
    })
})