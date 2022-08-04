import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import './Home.scss';
import Tower from './asset/image/tokyo-tower.jpg';
import Me from './asset/image/me.jpg';
import ReactImg from './asset/image/react.png';
import { useAPIGetUserInfo } from 'hooks/useAPIGetProfile';
import { UserInfoType } from 'types/index';
import { HtmlIcon } from 'components/atoms/icons/HtmlIcon';
import { CssIcon } from 'components/atoms/icons/CssIcon';
import { JavaIcon } from 'components/atoms/icons/JavaIcon';
import { VueIcon } from 'components/atoms/icons/VueIcon';
import { TypescriptIcon } from 'components/atoms/icons/TypescriptIcon';

const Home = memo(() => {
  const [userInfo, setUserInfo] = useState<Partial<UserInfoType>>();

  const introductionRef = useRef(null);

  useEffect(() => {
    (async () => {
      const getUserData = await useAPIGetUserInfo();
      setUserInfo(getUserData);
    })();
  }, []);

  const onClickWhosMe = useCallback(() => {
    introductionRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [introductionRef]);

  return (
    <div className="container">
      {/* トップ */}
      <header className="header" id="header">
        <div className="main-visual-container">
          <img src={Tower} className="main-img" />
          <div className="filter">
            <h1 className="title">
              <a href="#header">Portfolio</a>
            </h1>
            <div className="who-btn" onClick={onClickWhosMe}>
              Who's me?
            </div>
          </div>
        </div>
        <nav style={{ display: 'none' }}>
          <ul>
            <li>
              <a href="#">自己紹介</a>
            </li>
            <li>
              <a href="#">スキル・制作実績</a>
            </li>
            <li>
              <a href="#">お問い合わせ</a>
            </li>
          </ul>
        </nav>
      </header>
      {/* 自己紹介 */}
      <section
        className="self-introduction"
        id="introduction"
        ref={introductionRef}>
        <article>
          <h2 className="sub-title">
            <a href="#introduction">自己紹介</a>
          </h2>
          <div className="self-introduction-contents">
            <div className="img-container">
              <img src={Me} className="me-img" />
            </div>
            <div className="introduction">
              <p>名前：{userInfo?.firstName + userInfo?.lastName}</p>
              <p>出身：{userInfo?.birthplace}</p>
              <p>エンジニア歴：{userInfo?.engineerCareer}</p>
            </div>
          </div>
        </article>
      </section>
      {/** スキル・制作実績 */}
      <section className="skill-and-achievement">
        <article>
          <h2 className="sub-title">
            <a href="#skill">スキル・制作実績</a>
          </h2>
          <div className="skill-container">
            <HtmlIcon />
            <CssIcon />
            <img src={ReactImg} />
            <VueIcon />
            <TypescriptIcon />
            <JavaIcon />
            <div className="achievement-container">
              <div className="achievement-item">
                <h3>NETCH</h3>
                <img></img>
                {/** フワッと説明文を出したい */}
              </div>
              <div className="achievement-item">
                <h3>Carryon</h3>
                <img></img>
                {/** フワッと説明文を出したい */}
              </div>
              <div className="achievement-item">
                <h3>Money Square (FX)</h3>
                <img></img>
                {/** フワッと説明文を出したい */}
              </div>
            </div>
          </div>
        </article>
      </section>
      {/** お問い合わせ */}
      <section className="contact">
        <article>
          <h2 className="sub-title">
            <a href="#contact">お問い合わせ</a>
          </h2>
          <div></div>
        </article>
      </section>
    </div>
  );
});

export default Home;
