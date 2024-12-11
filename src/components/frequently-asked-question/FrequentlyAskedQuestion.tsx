"use client";

import React, {FC, useState} from 'react';
import {BsPlusLg} from "react-icons/bs";
import styles from "./FrequentlyAskedQuestion.module.scss";
import {FrequentlyAskedQuestionProps} from "@/types/frequentlyAskedQuestion";
import Dot from "@/components/dot/Dot";
import ContainerWrapper from "@/components/container-wrapper/ContainerWrapper";

const FrequentlyAskedQuestion: FC<FrequentlyAskedQuestionProps> = ({item, questions = []}) => {
    const [openAnswerIndex, setOpenAnswerIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenAnswerIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <ContainerWrapper>
            <div className={styles.wrapper}>
                <div className={styles.beanie}>
                    <h1 className={styles.headline}>
                        ВОПРОСЫ И ОТВЕТЫ
                    </h1>
                </div>
                <div className={styles.content}>
                    <Dot title="FAQ"/>
                    <section className={styles.faq}>
                        {questions.map(({question, answer}, index) => (
                            <div key={index} className={styles.question}>
                                <div className={styles.questionHeader}>
                                    <h3 className={styles.questionText}>{question}</h3>
                                    <button
                                        className={styles.questionButton}
                                        onClick={() => toggleAnswer(index)}
                                    >
                                        <BsPlusLg
                                            className={`${styles.icon} ${
                                                openAnswerIndex === index ? styles.iconActive : ''
                                            }`}
                                        />
                                    </button>
                                </div>
                                <div
                                    className={`${styles.answer} ${
                                        openAnswerIndex === index ? styles.answerVisible : ''
                                    }`}
                                >
                                    <p className={styles.answerText}>{answer}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default FrequentlyAskedQuestion;