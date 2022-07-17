// Testing
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
// Importing 'PaperbackImpl' is important for Sources to import properly.
import { APIWrapper } from './PaperbackImpl'

// Paperback Imports
//import { SearchRequest } from 'paperback-extensions-common'
import cheerio from 'cheerio'

// Source Imports
import { NHentai } from '../NHentai/NHentai'

describe('nhentai tests (id: template)', async () => {
    
    const wrapper = new APIWrapper()
    const source = new NHentai(cheerio)
    const expect = chai.expect
    chai.use(chaiAsPromised)
    
    /**
     * The Manga ID which this unit test uses to base it's details off of.
     * Try to choose a manga which is updated frequently, so that the historical checking test can
     * return proper results, as it is limited to searching 30 days back due to extremely long processing times otherwise.
     */
    const mangaId = 'template'

    it('todo', async () => {
        expect(mangaId, `what ${wrapper} ${source}`).to.equal(mangaId)
    })

})
