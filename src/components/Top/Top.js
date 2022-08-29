import { useState } from 'react';
import { withRouter } from 'react-router';
import GitHubButton from 'react-github-btn';
import githubIcon from "../../resources/github.svg";
import spotifyIcon from "../../resources/spotify.svg";

const Top = () => {
    const [allowPrivate, setAllowPrivate] = useState(true);
    return (
        <div className='translate-y-1/2'>
            <div className='py-8 px-4 mx-auto my-auto max-w-screen-xl lg:py-16 lg:px-12 text-center font-bold'>
                <div className=''>
                    <h1 className='text-5xl'><smam className="text-green-400">match</smam>list</h1>
                    <h3 className='text-xl mt-8'>選択したすべてのプレイリストが共通に持つ楽曲のみを抽出したプレイリストを作成 </h3>
                    <p className='inline-flex w-auto text-center items-center mt-4 flex-shrink-0 mr-4'><img src={githubIcon} width="30px" className='mr-2' style={{ filter: "invert(99%) sepia(37%) saturate(2%) hue-rotate(235deg) brightness(113%) contrast(100%)" }} /> <a href="https://github.com/BonyChops/matchlist" target="_blank" rel="noopener noreferrer">
                        BonyChops / matchlist
                    </a></p>
                    <GitHubButton className="ml-12" href="https://github.com/BonyChops/matchlist" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-star" data-show-count="true" aria-label="Star BonyChops/matchlist on GitHub" data-size='large'>Star</GitHubButton>
                    <br />
                    <div className='w-64 hover:bg-green-300 bg-green-500 mx-auto rounded-full py-4 text-black mt-8 cursor-pointer' onClick={() => {
                        global.location.href = "/api/login/spotify";
                    }}>
                        <span className="inline-flex w-auto items-center">
                            Login with {<img src={spotifyIcon} width="30px" className='ml-2' />}
                        </span>
                    </div>
                    <div className='inline-flex w-auto mt-8 items-center cursor-pointer' onClick={() => setAllowPrivate(!allowPrivate)}>
                        <div className={`w-16 rounded-full ${allowPrivate ? 'bg-green-400' : 'bg-gray-700'} h-8`}>
                            <div className={`w-8 h-8 rounded-full bg-white ${allowPrivate && 'ml-auto'}`} />
                        </div>
                        <span className='ml-4'>お気に入り / 非公開プレイリスト</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (Top);