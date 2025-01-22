"use client"

import React from 'react';
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import BottomNav from "@/components/bottom-nav/BottomNav";
import HeroSectionAbout from "@/components/hero-section-about/HeroSectionAbout";
import CustomBlock from "@/components/custom-block/CustomBlock";
import styles from "@/components/custom-block/CustomBlock.module.scss";
import Address from "@/components/address/Address";
import CompanyAdvantages from "@/components/company-advantages/CompanyAdvantages";
import Activity from "@/components/activity/Activity";
import Roadmap from "@/sections/roadmap/Roadmap";
import missionRU from "@/assets/images/missionPremiant.svg";
import missionEN from "@/assets/images/missionPremiantEN.svg";
import missionMobRU from "@/assets/images/missionPremiantMob.svg";
import missionMobEN from "@/assets/images/missionPremiantMobEN.svg";
import FeaturesInfoAbout from "@/components/feauture-info-about/FeaturesInfoAbout";
import {useUser} from "@/utils/UserContext";


const AboutPage = () => {

    const mission = {
        ru: missionRU,
        en: missionEN
    };

    const missionMob = {
        ru: missionMobRU,
        en: missionMobEN
    };

    const user = useUser();
    return (
        <>
            <HeroSectionAbout/>
            <FeaturesInfoAbout
                title="МИССИЯ КОМПАНИИ"
                modTitle="PREMIANT LTD"
                mainImg={mission}
                dotText="о нас"
                mobImg={missionMob}
            />
            <Address
                formTitle="Инвестируйте в технологии, которые работают на вас"
                formDescription="Выберите тарифный план, который идеально подходит для Ваших целей, и начните управлять своими инвестициями уже сегодня"
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
                                <a href="mailto:support@premiant.ltd"
                                   className={styles.value}>support@premiant.ltd</a>
                            </div>
                            <div>
                                <p className={styles.label}>Phone</p>
                                <a href="tel:+447813243472" className={styles.value}>+44 7813 243472</a>
                            </div>
                            <div>
                                <p className={styles.label}>Telegram</p>
                                <a href="https://t.me/PremiantLTD" className={styles.value} target="_blank"
                                   rel="noopener noreferrer">@PremiantLTD</a>
                            </div>
                        </div>
                    </CustomBlock>
                }
            />
            <Activity
                title="ЧЕМ"
                modTitle="МЫ ЗАНИМАЕМСЯ"
                headDescription="Premiant LTD предоставляет инновационные решения для эффективного управления
                рекламным трафиком и криптовалютными активами. Мы используем передовые алгоритмы и технологии
                машинного обучения (Искусственный Интеллект), чтобы обеспечивать нашим клиентам стабильный доход
                и максимальную прибыль."
            >
            <CustomBlock variant="featureScheme">
                    <div>
                        <p>ЭФФЕКТИВНЫЕ РЕКЛАМНЫЕ РЕШЕНИЯ</p>
                    </div>
                    <p>
                        Мы предлагаем решения для управления рекламными кампаниями и увеличения конверсии, используя
                        передовые алгоритмы и аналитические инструменты. Анализируем трафик из разных источников и
                        оптимизируем
                        доход.
                    </p>
                </CustomBlock>
            </Activity>
            <Roadmap/>
            <CompanyAdvantages
                headline="СЕКРЕТЫ НАШЕГО "
                modHeadline="ПРЕВОСХОДСТВА"
                content={[
                    {
                        paragraph: "Передовые алгоритмы",
                        text: "Мы применяем самые передовые алгоритмы искусственного интеллекта, чтобы точно оценивать трафик и эффективно управлять инвестициями. Это позволяет нам находить лучшие пути для оптимизации и увеличения дохода клиентов в кратчайшие промежутки времени, обеспечивая быструю окупаемость на инвестиций."
                    },
                    {
                        paragraph: "Выгодная партнерская программа",
                        text: "Premiant LTD предлагает партнерам привлекательные условия, позволяя не только " +
                            "получать доход от арбитража трафика, но и зарабатывать на привлечении новых партнеров. " +
                            "Мы предоставляем все необходимые ресурсы и поддержку для расширения сети и увеличения доходов."
                    },
                    {
                        paragraph: "Гибкость и адаптивность",
                        text: "Мы оперативно реагируем на изменения рынка, внедряя инновациоонные подходы ИИ, что позволяет автоматически моментально адаптировать стратегии под текущие условия. Это помогает нашим клиентам сохранять лидерские позиции и гарантированно получать высокую отдачу от своих инвестиций, несмотря на изменения рынка."
                    },
                    {
                        paragraph: "Профессиональная поддержка 24/7",
                        text: "Мы обеспечиваем круглосуточную техническую поддержку для всех наших клиентов. " +
                            "Наша команда экспертов оперативно отвечает на вопросы, решает возникающие трудности и " +
                            "помогает найти оптимальные решения для достижения ваших целей."
                    },
                    {
                        paragraph: "Международный опыт",
                        text: "Благодаря нашему международному опыту, Premiant LTD обладает всеми современными " +
                            "технологиями для эффективной монетизации трафика, предоставляя нашим клиентам конкурентные " +
                            "преимущества на глобальных рынках. Мы работаем с ведущими партнёрами по всему миру, чтобы " +
                            "обеспечивать доступ к эксклюзивным потокам трафика и максимизировать результаты нашей работы."
                    },
                    {
                        paragraph: "Простота в использовании",
                        text: "Мы стремимся к созданию максимально удобного и интуитивно понятного интерфейса для наших " +
                            "клиентов. Все инструменты и функции легко доступны и понятны в использовании, что избавляет " +
                            "от лишних трудностей и позволяет работать продуктивно. Также вскоре мы представим мобильное " +
                            "приложение, которое сделает взаимодействие с нашим сервисом ещё комфортнее."
                    },
                ]}
            />
            <BottomNav
                logo={BottomNuvLogo}
                links={[
                    { name: 'Главная', route: '/' },
                    { name: 'О Компании', route: '/about' },
                    { name: 'Инвесторам', route: '/#features' },
                    { name: 'FAQ', route: '/#faq' },
                    { name: 'Контакты', route: '/#address' },
                    ...(user ? [{ name: 'Мой аккаунт', route: '/account' }] : [
                        { name: 'Логин', route: '/login' },
                        { name: 'Регистрация', route: '/register' }
                    ])
                ]}
                burgerIcon={<GiHamburgerMenu />}
            />
        </>
    );
};

export default AboutPage;