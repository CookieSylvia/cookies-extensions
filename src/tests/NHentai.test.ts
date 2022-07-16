// Testing
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
// Importing 'PaperbackImpl' is important for Sources to import properly.
import { APIWrapper } from './PaperbackImpl'

// Paperback Imports
import { SearchRequest } from 'paperback-extensions-common'
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

    it('Retrieve Manga Details', async () => {
        const details = await wrapper.getMangaDetails(source, mangaId)
        expect(details, 'No results found with test-defined ID [' + mangaId + ']').to.exist

        // Validate that the fields are filled
        const data = details

        expect(data.image, 'Missing Image').to.be.not.empty
        expect(data.status, 'Missing Status').to.exist
        expect(data.desc, 'Found Description').to.not.exist
        expect(data.titles, 'Missing Titles').to.be.not.empty
        expect(data.rating, 'Found Rating').to.not.exist
    })

    it('Get Chapters', async () => {
        const data = await wrapper.getChapters(source, mangaId)

        expect(data, 'No chapters present for: [' + mangaId + ']').to.not.be.empty

        const entry = data[0]
        expect(entry?.id, 'No ID present').to.be.not.empty
        expect(entry?.chapNum, 'No chapter number present').to.be.not.null
    })

    it('Get Chapter Details', async () => {
        const chapters = await wrapper.getChapters(source, mangaId)

        const data = await wrapper.getChapterDetails(source, mangaId, chapters[0]?.id ?? 'c1')
        expect(data, 'No server response').to.exist
        expect(data, 'Empty server response').to.not.be.empty

        expect(data.id, 'Missing ID').to.be.not.empty
        expect(data.mangaId, 'Missing MangaID').to.be.not.empty
        expect(data.pages, 'No pages present').to.be.not.empty
    })

    it('Get tags', async () => {
        const tags = await wrapper.getSearchTags(source)
        expect(tags, 'Server response').to.not.exist
    })

    it('Testing home page results for popular titles', async () => {
        const results = await wrapper.getViewMoreItems(source, 'hot_release', {}, 1)

        expect(results, 'This section exists').to.not.exist
    })

    it('Testing search', async () => {
        const testSearch: SearchRequest = {
            title: 'template',
            parameters: {
                includedTags: ['template'],
            },
        }

        const search = await wrapper.getSearchResults(source, testSearch, 1)
        const result = search.results[0]

        expect(result, 'No response from server').to.exist

        expect(result?.id, 'No ID found for search query').to.be.not.empty
        expect(result?.image, 'No image found for search').to.be.not.empty
        expect(result?.title, 'No title').to.be.not.null
        expect(result?.subtitleText, 'No subtitle text').to.be.not.null
    })

    it('Testing Home-Page aquisition', async () => {
        const homePages = await wrapper.getHomePageSections(source)

        expect(homePages, 'No response from server').to.exist
        expect(homePages, 'Sections present').to.be.empty
    })

    it('Testing Notifications', async () => {
        const updates = await wrapper.filterUpdatedManga(source, new Date('2021-9-10'), [mangaId])

        expect(updates, 'No server response').to.exist
        expect(updates, 'Non-empty server response').to.be.empty
    })
})
