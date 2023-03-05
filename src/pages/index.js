import Head from 'next/head'
import ImageList from './components/ImageList'
import Nav from './components/Nav'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Colrs Images</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className='py-5'>
        <ImageList />
      </main>
      <Footer />
    </>
  )
}
