import React from 'react';
import Header from '@/components/header/Header';
import Footer from "@/components/footer/Footer";
import Button from "@/components/button/Button";
import BottomNuvLogo from "@/assets/images/bottomNuvLogo.svg";
import {GiHamburgerMenu} from "react-icons/gi";
import BottomNav from "@/components/bottom-nav/BottomNav";
import HeroSectionAbout from "@/components/hero-section-about/HeroSectionAbout";
import FormItem from "@/assets/icons/formItem.svg";
import HomeForm from "@/components/home-form/HomeForm";
import CustomBlock from "@/components/custom-block/CustomBlock";
import styles from "@/components/custom-block/CustomBlock.module.scss";
import Address from "@/components/address/Address";
import CompanyAdvantagesItem from "@/assets/icons/companyAdvantagesItem.svg";
import CompanyAdvantages from "@/components/company-advantages/CompanyAdvantages";
import FeaturesInfo from "@/components/features-info/FeaturesInfo";
import Activity from "@/components/activity/Activity";
import RoadMap from "@/components/road-map/RoadMap";


const AboutPage = () => {
    return (
        <>
            <Header
                headerLinks={[
                    {name: 'Главная', route: '#'},
                    {name: 'О Компании', route: '/about'},
                    {name: 'Инвесторам/Партнерам', route: '#'},
                    {name: 'FAQ', route: '#'},
                    {name: 'Контакты', route: '/contacts'},
                ]}
            >
                <Button variant="headerSign">Войти</Button>
                <Button variant="outline">Регистрация</Button>
            </Header>

            <HeroSectionAbout/>

            <FeaturesInfo
                item="ПОЧЕМУ МЫ"
                title="МИССИЯ КОМПАНИИ"
                modTitle="PREMIANT LTD"
            >
                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>01</h2>
                        <p>Максимальная выгода от арбитража трафика и криптоактивов</p>
                    </div>

                    <p>
                        Забезпечуємо максимальну прибутковість для клієнтів через інноваційні стратегії та сучасні
                        технології
                    </p>
                </CustomBlock>

                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>02</h2>
                        <p>Прозрачность и доверие: контроль и отчеты для клиентов</p>
                    </div>

                    <p>
                        Детализированные отчеты и полный контроль помогают клиентам отслеживать результаты и принимать
                        обоснованные решения, укрепляя доверие
                    </p>
                </CustomBlock>

                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>03</h2>
                        <p>Успешное партнерство для глобального роста</p>
                    </div>

                    <p>
                        Мы сотрудничаем с ведущими рекламными сетями, обеспечивая качественный трафик со всего мира
                    </p>
                </CustomBlock>

                <CustomBlock variant="featureScheme">
                    <div>
                        <h2>04</h2>
                        <p>Инновации и адаптация к рынку</p>
                    </div>

                    <p>
                        Мы внедряем современные алгоритмы и следим за тенденциями, чтобы обеспечивать клиентам лучшие
                        результаты и конкурентные преимущества
                    </p>
                </CustomBlock>

            </FeaturesInfo>

            <HomeForm
                item={FormItem}
                headline="ОСТАВЬТЕ ЗАЯВКУ"
                description="Контролируй свои средства и уверенно двигайся к своим финансовым целям вместе с Skylex LTD.
                 С нами ты получишь надежного партнера, который поможет заставить твои деньги работать на тебя и приносить стабильный
                  доход."
            >
                <Button variant="form">Отправить</Button>
            </HomeForm>

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
                item="КТО МЫ?"
                title="ЧЕМ"
                modTitle="МЫ ЗАНИМАЕМСЯ"
                headDescription="В компании Skylex LTD мы специализируемся на арбитраже интернет-трафика и
                   криптовалютных активов, предоставляя инновационные решения для получения прибыли"
                childrenBtn={<Button variant="calculator">Проверить компанию</Button>}
            >
                <CustomBlock variant="featureScheme">
                    <div>
                        <p>ЭФФЕКТИВНЫЕ РЕКЛАМНЫЕ РЕШЕНИЯ</p>
                    </div>
                    <p>
                        Мы предлагаем решения для управления рекламными кампаниями и увеличения конверсии, используя
                        передовые алгоритмы и аналитические инструменты. Анализируем трафик из разных источников и оптимизируем
                        доход
                    </p>
                </CustomBlock>
            </Activity>

            <RoadMap/>

            <CompanyAdvantages
                item={CompanyAdvantagesItem}
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

            <Footer
                footerLinks={[
                    {name: 'Главная', route: '#'},
                    {name: 'О Компании', route: '#'},
                    {name: 'Инвесторам/Партнерам', route: '#'},
                    {name: 'FAQ', route: '#'},
                    {name: 'Контакты', route: '#'},
                    {name: 'Поддержка', route: '#'},
                ]}
                contacts={[
                    {label: 'E-mail', value: 'premiantltd@gmail.com'},
                    {label: 'Phone', value: '+38 888 88 88 888'},
                    {label: 'Telegram', value: '@ltdpr'},
                ]}
            >

                <Button variant="hero">Начать инвестировать</Button>

            </Footer>

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