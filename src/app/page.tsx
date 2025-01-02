import React from "react";
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
    return (
        <>
            <HeroSection
                headline="ИНВЕСТИРУЙТЕ С НАМИ И ПРИУМНОЖАЙТЕ СВОЙ КАПИТАЛ"
                text="Присоединяйтесь к платформе уже сегодня и откройте новые возможности для роста!"
            >
                <Button variant="hero">Начать инвестировать</Button>
            </HeroSection>
            <PromoBar
                price={PricePromo}
                text="За время перебывания вас на сайте наши партнеры заработали"
                promoLink={{name: "Присоедениться к нам", route: '/register'}}
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
                title="КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА"
                modTitle="РАБОТЫ С PREMIANT LTD">
            </FeaturesInfo>
            <CompanyAdvantages
                headline="СЕКРЕТЫ НАШЕГО"
                modHeadline="ПРЕВОСОДСТВА"
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
            <TariffCalculator/>
            <FrequentlyAskedQuestion
                item={FrequentlyAskedQuestionItem}
                questions={[
                    {
                        question: "Что представляет собой Premiant LTD?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    }, {
                        question: "Как начать работу с Premiant LTD?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    }, {
                        question: "Какие данные необходимы для регистрации?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    }, {
                        question: "Можно ли вывести инвестиции досрочно?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    }, {
                        question: "Какие способы оплаты принимает Premiant LTD?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    }, {
                        question: "Как часто обновляется информация на платформе Premiant LTD?",
                        answer: "Premiant LTD — это ведущая платформа для арбитража интернет-трафика и криптовалютных активов," +
                            " предлагающая инновационные решения для оптимизации и монетизации трафика с использованием передовых" +
                            " технологий и стратегий."
                    },
                ]}
            />
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
            <CookiePopup />
        </>
    );
}
