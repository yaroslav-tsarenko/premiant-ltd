"use client";

import React, {useRef} from "react";
import Button from "@/components/button/Button";
import BottomNav from "@/components/bottom-nav/BottomNav";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import HeroSection from "@/components/hero-section/HeroSection";
import PromoBar from "@/components/promo-bar/PromoBar";
import PricePromo from "@/assets/icons/pricePromo.svg";
import ArrowRight from "@/assets/icons/arrowRight.svg";
import CompanyInfo from "@/components/company-info/CompanyInfo";
import CompanyFirstImage from "@/assets/images/companyFirstImage.svg"
import CompanySecondImage from "@/assets/images/companySecondImage.svg"
import customBlocksImageRU from "@/assets/images/key-benefits.svg"
import customBlocksImageEN from "@/assets/images/key-benefits-en.svg"
import customBlocksImageMobRU from "@/assets/images/key-benefits-mob.svg"
import customBlocksImageMobEN from "@/assets/images/key-benefits-mob-en.svg"
import CompanyThirdImage from "@/assets/images/companyThirdImage.svg"
import CompanyAdvantages from "@/components/company-advantages/CompanyAdvantages";
import FeaturesInfo from "@/components/features-info/FeaturesInfo";
import FrequentlyAskedQuestion from "@/components/frequently-asked-question/FrequentlyAskedQuestion";
import FrequentlyAskedQuestionItem from "@/assets/icons/frequentlyAskedQuestionItem.svg";
import Address from "@/components/address/Address";
import CustomBlock from "@/components/custom-block/CustomBlock";
import styles from "@/components/custom-block/CustomBlock.module.scss";
import TariffCalculator from "@/components/tariff-calculator/TariffСalculator";
import CookiePopup from "@/components/cookie-popup/CookiePopup";
import {useUser} from "@/utils/UserContext";

export default function Home() {
    const addressRef = useRef<HTMLDivElement>(null);
    const user = useUser();

    const handleNav = () => {
        if (addressRef.current) {
            addressRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const customBlocksImage = {
        ru: customBlocksImageRU,
        en: customBlocksImageEN
    };

    const customBlocksImageMob = {
        ru: customBlocksImageMobRU,
        en: customBlocksImageMobEN
    };

    return (
        <>
            <HeroSection
                headline="Инвестируйте в технологии, которые приносят результат"
                text="Получайте максимальную отдачу от трафика криптовалютных активов при помощи Искусственного Интеллекта">
            </HeroSection>
            <PromoBar
                price={PricePromo}
                text="Пока вы следите, наши партнеры зарабатывают больше!"
                promoLink={{name: "Присоединиться к нам", route: '/register'}}
                arrowIcon={ArrowRight}
            />
            <CompanyInfo
                images={[
                    {image: CompanyFirstImage},
                    {image: CompanySecondImage},
                    {image: CompanyThirdImage}
                ]}>
                <Button variant={"companyInfo"}>Начать инвестировать</Button>
            </CompanyInfo>
            <FeaturesInfo
                dotText="арбитраж трафика"
                title="КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА"
                modTitle="РАБОТЫ С PREMIANT LTD"
                mainImg={customBlocksImage}
                mobImg={customBlocksImageMob}
            />
            <CompanyAdvantages
                headline="СЕКРЕТЫ НАШЕГО"
                modHeadline="ПРЕВОСХОДСТВА"
                content={[
                    {
                        paragraph: "Передовые алгоритмы",
                        text: "Мы применяем самые передовые алгоритмы искусственного интеллекта, чтобы точно оценивать" +
                            " трафик и эффективно управлять инвестициями. Это позволяет нам находить лучшие пути для " +
                            "оптимизации и увеличения дохода клиентов в кратчайшие промежутки времени, обеспечивая быструю " +
                            "окупаемость на инвестиций."
                    },
                    {
                        paragraph: "Выгодная партнерская программа",
                        text: "Premiant LTD предлагает партнерам привлекательные условия, позволяя не только " +
                            "получать доход от арбитража трафика, но и зарабатывать на привлечении новых партнеров. " +
                            "Мы предоставляем все необходимые ресурсы и поддержку для расширения сети и увеличения " +
                            "доходов."
                    },
                    {
                        paragraph: "Гибкость и адаптивность",
                        text: "Мы оперативно реагируем на изменения рынка, внедряя инновациоонные подходы ИИ," +
                            " что позволяет автоматически моментально адаптировать стратегии под текущие условия." +
                            " Это помогает нашим клиентам сохранять лидерские позиции и гарантированно получать высокую " +
                            "отдачу от своих инвестиций, несмотря на изменения рынка."
                    },
                    {
                        paragraph: "Профессиональная поддержка 24/7",
                        text: "Мы обеспечиваем круглосуточную техническую поддержку для всех наших клиентов. Наша " +
                            "команда экспертов оперативно отвечает на вопросы, решает возникающие трудности и помогает " +
                            "найти оптимальные решения для достижения ваших целей."
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
            <TariffCalculator handleNav={handleNav}/>
            <FrequentlyAskedQuestion
                item={FrequentlyAskedQuestionItem}
                questions={[
                    {
                        question: "Как начать работу с Premiant LTD?",
                        answer: "Для начала работы с Premiant LTD достаточно выполнить несколько простых шагов. Сначала перейдите на наш сайт и нажмите на кнопку \"Регистрация\". Затем заполните необходимую информацию, следуя указаниям на экране. После регистрации вы сможете ознакомиться с доступными инвестиционными возможностями и сразу приступить к реализации ваших целей. Наши консультанты всегда готовы предоставить необходимую поддержку на каждом этапе."
                    }, {
                        question: "Какие инвестиционные возможности вы предлагаете?",
                        answer: "Premiant LTD предлагает инвестиционные возможности посредством арбитража трафика, управления криптовалютными активами при помощи Искусственного Интеллекта, а также выгодную партнерскую программу. Эти опции позволяют нашим клиентам максимально эффективно использовать свои инвестиции и расширять возможности для роста."
                    }, {
                        question: "Как осуществляется вывод прибыли?",
                        answer: "Вывод прибыли на платформе осуществляется быстро и без задержек. Вам достаточно выбрать удобный метод оплаты из доступных вариантов (Visa/MasterCard, Tether (USDT TRC-20), Perfect Money, Payeer, Bitcoin, Ethereum), указать желаемую сумму и отправить запрос на вывод. Средства будут перечислены на выбранный вами способ оплаты в течение 5-15 минут."
                    }, {
                        question: "Есть ли скрытые комиссии или дополнительные платежи?",
                        answer: "Мы гарантируем полную прозрачность во всех финансовых вопросах. На платформе Premiant LTD нет скрытых комиссий или дополнительных платежей. Все условия сотрудничества устанавливаются заранее и доступны для ознакомления. Мы уверены, что прозрачность финансовых процедур является ключом к долгосрочному успешному сотрудничеству. Вы всегда будете в курсе всех затрат и условий использования наших услуг."
                    }, {
                        question: "Как осуществляется мониторинг и отчётность по инвестициям?",
                        answer: "Инвестиции можно отслеживать через личный кабинет на платформе. Мы предоставляем детализированные отчеты о состоянии инвестиций, доходности и всех транзакциях. Наша команда аналитиков регулярно готовит отчеты, чтобы вы могли контролировать свой инвестиционный портфель и принимать обоснованные решения."
                    }, {
                        question: "Какие есть минимальные и максимальные суммы инвестирования?",
                        answer: "Минимальные и максимальные суммы инвестирования зависят от выбранного тарифа вашего участия. Кампания разработала 5 возможных тарифных планов. Минимальный из них тариф «Старт» с суммой инвестиции от 100$. Максимальный тариф «Эксклюзив» с суммой инвестиции от 40 000$."
                    }, {
                        question: "Можно ли вывести инвестиции досрочно?",
                        answer: "Условия досрочного вывода инвестиций зависят от выбранного вами тарифного плана. Для получения детальной информации о возможности и условиях досрочного вывода, пожалуйста, свяжитесь с нашей службой поддержки."
                    }, {
                        question: "Какие гарантии безопасности моих инвестиций?",
                        answer: "Premiant LTD использует современные технологии безопасности, включая шифрование данных и двухфакторную аутентификацию, чтобы гарантировать сохранность ваших инвестиций. Наша команда постоянно следит за безопасностью платформы и проводит регулярные аудиты. (FCA, UK GAAP, HMRC, ICARA, ESG, AML)"
                    },
                ]}
            />
            <div ref={addressRef}>
                <Address
                    formTitle="Остались вопросы?"
                    formDescription="Просто оставьте заявку, наша служба поддержки всегда готова Вам помочь!"
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
                                    <p className={styles.value}>
                                        <a href="mailto:premiantltd@gmail.com">premiantltd@gmail.com</a>
                                    </p>
                                </div>
                                <div>
                                    <p className={styles.label}>Phone</p>
                                    <p className={styles.value}>
                                        <a href="tel:+44 7813 243472">+44 7813 243472</a>
                                    </p>
                                </div>
                                <div>
                                    <p className={styles.label}>Telegram</p>
                                    <p className={styles.value}>
                                        <a href="https://t.me/PremiantLTD" target="_blank"
                                           rel="noopener noreferrer">@PremiantLTD</a>
                                    </p>
                                </div>
                            </div>
                        </CustomBlock>
                    }
                />
            </div>
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
            <CookiePopup/>
        </>
    );
}
