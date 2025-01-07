
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
import customBlocksImage from "@/assets/images/key-benefits.svg"
import customBlocksImageMob from "@/assets/images/key-benefits-mob.svg"
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

export default function Home() {

    const addressRef = useRef<HTMLDivElement>(null);

    const handleNav = () => {
        if (addressRef.current) {
            addressRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
            >
            </FeaturesInfo>
            <CompanyAdvantages
                headline="СЕКРЕТЫ НАШЕГО"
                modHeadline="ПРЕВОСОДСТВА"
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
                        answer: "Мы гарантируем полную прозрачность во всех финансовых вопросах. На платформе Premiant LTD нет скрытых комиссий или дополнительных платежей. Все условия сотрудничества устанавливаются заранее и доступны для ознакомления. Мы уверены, что прозрачность финансовых процедур является ключом к долгосрочному успешному сотрудничеству. Вы всегда будете в курсе всех затрат и условий использования наших услуг."
                    }, {
                        question: "Как осуществляется вывод прибыли?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    }, {
                        question: "Есть ли скрытые комиссии или дополнительные платежи?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    }, {
                        question: "Как осуществляется мониторинг и отчётность по инвестициям?",
                        answer: "Условия досрочного вывода инвестиций зависят от выбранного вами тарифного плана. Для получения детальной информации о возможности и условиях досрочного вывода, пожалуйста, свяжитесь с нашей службой поддержки."
                    }, {
                        question: "Какие есть минимальные и максимальные суммы инвестирования?",
                        answer: "Premiant LTD использует современные технологии безопасности, включая шифрование данных и двухфакторную аутентификацию, чтобы гарантировать сохранность ваших инвестиций. Наша команда постоянно следит за безопасностью платформы и проводит регулярные аудиты."
                    }, {
                        question: "Можно ли вывести инвестиции досрочно?",
                        answer: "Условия досрочного вывода инвестиций зависят от выбранного вами тарифного плана. Для получения детальной информации о возможности и условиях досрочного вывода, пожалуйста, свяжитесь с нашей службой поддержки."
                    }, {
                        question: "Какие гарантии безопасности моих инвестиций?",
                        answer: "Premiant LTD использует современные технологии безопасности, включая шифрование данных и двухфакторную аутентификацию, чтобы гарантировать сохранность ваших инвестиций. Наша команда постоянно следит за безопасностью платформы и проводит регулярные аудиты."
                    },
                ]}
            />
            <div ref={addressRef}>
                <Address
                    formTitle="Остались вопросы?"
                    formDescription="Просто оставьте заявку, наша служба поддержки всегда готова вам помочь!"
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
                                    <p className={styles.value}>+447813243472</p>
                                </div>
                                <div>
                                    <p className={styles.label}>Telegram</p>
                                    <p className={styles.value}>@PremiantLTD</p>
                                </div>
                            </div>
                        </CustomBlock>
                    }
                />
            </div>
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
            <CookiePopup/>
        </>
    );
}
