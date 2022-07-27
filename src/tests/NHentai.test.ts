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
import {
    Manga,
    SearchRequest, 
} from 'paperback-extensions-common'

//? fixme: Major problem... how to bypass Cloudflare when testing?
describe('nhentai Tests', async () => {
    const wrapper = new APIWrapper()
    const source = new NHentai(cheerio)
    const expect = chai.expect
    chai.use(chaiAsPromised)

    /**
     * The Manga ID which this unit test uses to base it's details off of.
     * Try to choose a manga which is updated frequently, so that the historical checking test can
     * return proper results, as it is limited to searching 30 days back due to extremely long processing times otherwise.
     */
    const mangaId = '286444' // [Igumox] Muramata-san no Himitsu | Muramata-san's secret 1-3 [English] [BloodFever] [Digital]

    it('Cloudflare bypass', async () => {
        // prettier-ignore
        await expect(wrapper.getMangaDetails(source, mangaId), 'Unable to bypass Cloudflare during tests').to.not.be.rejected
    })

    /*
     * Tags: big breasts, sole female, sole male, nakadashi, blowjob,
     *       x-ray, full censorship, femdom, hairy, story arc, fingering,
     *       kissing, virginity, rimjob, business suit, leg lock,
     *       squirting, foot licking, body modification, pixie cut, oil
     * Artists: igumox
     * Languages: translated, english
     * Categories: manga
     * Pages: 85
     * Uploaded: 2019-09-29T02:51:20.752631+00:00 | 29/09/2019, 04:51:20
     */

    it('Retrieve Manga Details', async () => {
        const details = await wrapper.getMangaDetails(source, mangaId)

        const data = details
        // createManga requires 'id'
        expect((data as Manga & { id: string }).id, 'Missing ID').to.be.not.empty
        expect(data.image, 'Missing Image').to.be.not.empty
        expect(data.artist, 'Missing Artist').to.be.not.empty
        // nhentai is always hentai
        expect(data.hentai, 'Missing Hentai').to.be.true
    })

    it('Get Chapters', async () => {
        const data = await wrapper.getChapters(source, mangaId)
        expect(data, 'No chapters present for: [' + mangaId + ']').to.not.be.empty
        // Only 1 chapter per mangaId using nhentai
        expect(data.length, '').to.equal(1)
    })

    it('Get Chapter Details', async () => {
        // ChapterId isn't used in nhentai
        const data = await wrapper.getChapterDetails(source, mangaId, mangaId)

        expect(data, 'No server response').to.exist
        expect(data, 'Empty server response').to.not.be.empty

        expect(data.id, 'Missing ID').to.be.not.empty
        expect(data.mangaId, 'Missing hentaiId').to.be.not.empty
        expect(data.pages, 'No pages present').to.be.not.empty
    })

    it('Searching for Manga With Multiple Keywords', async () => {
        const testSearch: SearchRequest = {
            title: 'sole female bikini -rape',
            parameters: {},
        }

        const search = await wrapper.getSearchResults(source, testSearch)
        const result = search.results[0]

        expect(result, 'No response from server').to.exist

        expect(result?.id, 'No ID found for search query').to.be.not.empty
        expect(result?.image, 'No image found for search').to.be.not.empty
        expect(result?.title, 'No title').to.be.not.null
        expect(result?.subtitleText, 'No subtitle text').to.be.not.null
        expect(result?.primaryText, 'No primary text').to.be.not.null
        expect(result?.secondaryText, 'No secondary text').to.be.not.null
    })

    it('Searching for Manga With A Valid six-digit query', async () => {
        const testSearch: SearchRequest = {
            title: '312483',
            parameters: {},
        }

        const search = await wrapper.getSearchResults(source, testSearch)
        const result = search.results[0]
        expect(result).to.exist

        expect(result?.id).to.exist
        expect(result?.image).to.exist
        expect(result?.title).to.exist
    })

    it('Searching for Manga With A Valid five-digit query', async () => {
        const testSearch: SearchRequest = {
            title: '98125',
            parameters: {},
        }

        const search = await wrapper.getSearchResults(source, testSearch)
        const result = search.results[0]
        expect(result).to.exist

        expect(result?.id).to.exist
        expect(result?.image).to.exist
        expect(result?.title).to.exist
    })

    it('Searching for Manga With an invalid six-digit query', async () => {
        const testSearch: SearchRequest = {
            title: '999999',
            parameters: {},
        }

        const search = await wrapper.getSearchResults(source, testSearch)
        // Invalid digits are empty when searching.
        expect(search).to.be.empty
    })

    it('Retrieve Home Page Sections', async () => {
        const data = await wrapper.getHomePageSections(source)
        expect(data, 'No response from server').to.exist
        expect(data, 'No response from server').to.be.not.empty

        const newHentai = data[0]
        expect(newHentai?.id, 'Recent ID does not exist').to.not.be.empty
        expect(newHentai?.title, 'Recent manga section does not exist').to.not.be.empty
        expect(newHentai?.items, 'No items available for popular titles').to.not.be.empty
    })

    it('Show More Homepage data', async () => {
        const data = await wrapper.getViewMoreItems(source, 'none', {})
        expect(data, 'No response from server').to.exist
        expect(data, 'No response from server').to.be.not.empty
    })
})
