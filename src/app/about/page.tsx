import React from 'react';
import Button from "@/components/button/Button";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import BottomNav from "@/components/bottom-nav/BottomNav";
import HeroSectionAbout from "@/components/hero-section-about/HeroSectionAbout";
import CustomBlock from "@/components/custom-block/CustomBlock";
import styles from "@/components/custom-block/CustomBlock.module.scss";
import Address from "@/components/address/Address";
import CompanyAdvantages from "@/components/company-advantages/CompanyAdvantages";
import FeaturesInfo from "@/components/features-info/FeaturesInfo";
import Activity from "@/components/activity/Activity";
import Roadmap from "@/sections/roadmap/Roadmap";


const AboutPage = () => {
    return (
        <>
            <HeroSectionAbout/>
            <FeaturesInfo
                title="МИССИЯ КОМПАНИИ"
                modTitle="PREMIANT LTD"/>
            <Address
                firstChildren={
                    <CustomBlock variant="address">
                        <div>
                            <h2>АДРЕС КОМПАНИИ</h2>
                            <p>52 Chequer Avenue, Doncaster, England, DN4 5AS</p>
                        </div>
                    </CustomBlock>
                }
                secondChildren={
                    <CustomBlock variant="addressContact">
                        <div>
                            <div>
                                <p className={styles.label}>E-mail</p>
                                <p className={styles.value}>premiantltd@gmail.com</p>
                            </div>
                            <div>
                                <p className={styles.label}>Phone</p>
                                <p className={styles.value}>+38 888 88 88 888</p>
                            </div>
                            <div>
                                <p className={styles.label}>Telegram</p>
                                <p className={styles.value}>@ltdpr</p>
                            </div>
                        </div>
                    </CustomBlock>
                }
            />
            <Activity
                title="ЧЕМ"
                modTitle="МЫ ЗАНИМАЕМСЯ"
                headDescription="В компании Skylex LTD мы специализируемся на арбитраже интернет-трафика и
                   криптовалютных активов, предоставляя инновационные решения для получения прибыли"
                childrenBtn={<Button variant="check">Проверить компанию</Button>}
            >
                <CustomBlock variant="featureScheme">
                    <div>
                        <p>ЭФФЕКТИВНЫЕ РЕКЛАМНЫЕ РЕШЕНИЯ</p>
                    </div>
                    <p>
                        Мы предлагаем решения для управления рекламными кампаниями и увеличения конверсии, используя
                        передовые алгоритмы и аналитические инструменты. Анализируем трафик из разных источников и
                        оптимизируем
                        доход
                    </p>
                </CustomBlock>
            </Activity>
            <Roadmap/>
            <CompanyAdvantages
                headline="НАШИ ПРИЕМУЩЕСТВА"
                content={[
                    {
                        paragraph: "Высокая рентабельность",
                        text: "Мы гарантируем нашим клиентам высокую рентабельность инвестиций благодаря тщательному анализу" +
                            " и оптимизации рекламных кампаний."
                    },
                    {
                        paragraph: "Выгодная партнерская программа",
                        text: "Мы предлагаем нашим клиентам выгодную партнерскую программу с привлекательными условиями." +
                            " С Skylex LTD вы можете не только получать доход от арбитража трафика, но и зарабатывать" +
                            " на привлечении новых партнеров, увеличивая свой доход и расширяя свою сеть партнеров"
                    },
                    {
                        paragraph: "Качественный трафик",
                        text: "Наша обширная сеть партнеров включает ведущие рекламные платформы и сети по всему миру." +
                            " Это позволяет нам привлекать из разных источников и предоставлять нашим клиентам уникальные" +
                            " возможности для монетизации."
                    },
                    {
                        paragraph: "Поддержка на каждом этапе 24/7",
                        text: "Мы обеспечиваем круглосуточную техническую поддержку для всех наших клиентов." +
                            " Наша команда специалистов всегда готова ответить на ваши вопросы и помочь с трудностями, если таковые возникнут"
                    },
                    {
                        paragraph: "Непрерывное развитие",
                        text: "Мы постоянно внедряем новейшие технологии и аналитические инструменты, чтобы оставаться передовой" +
                            " компанией в индустрии арбитража интернет-трафика"
                    },
                    {
                        paragraph: "Простота в использовании",
                        text: "Регистрация не займет много времени. Наш удобный интерфейс позволяет легко начать работу, и уже в" +
                            " считанные минуты вы сможете воспользоваться всеми преимуществами нашего сервиса."
                    },
                ]}
            />
            <BottomNav
                logo={BottomNuvLogo}
                links={[
                    {name: 'Главная', route: '#'},
                    {name: 'О Компании', route: '/about'},
                    {name: 'Инвесторам/Партнерам', route: '#'},
                    {name: 'FAQ', route: '#'},
                    {name: 'Контакты', route: '/contacts'},
                ]}
                burgerIcon={<GiHamburgerMenu/>}
            />
        </>
    );
};

export default AboutPage;