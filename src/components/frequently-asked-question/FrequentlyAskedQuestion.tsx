"use client";

import React, {FC, useState} from 'react';
import {BsPlusLg} from "react-icons/bs";
import styles from "./FrequentlyAskedQuestion.module.scss";
import {FrequentlyAskedQuestionProps} from "@/types/frequentlyAskedQuestion";
import Dot from "@/components/dot/Dot";

const FrequentlyAskedQuestion: FC<FrequentlyAskedQuestionProps> = ({questions = []}) => {
    const [openAnswerIndex, setOpenAnswerIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenAnswerIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
            <div className={styles.wrapper} id="faq">
                <div className={styles.beanie}>
                    <h1 className={styles.headline}>
                        ВОПРОСЫ И ОТВЕТЫ
                    </h1>
                </div>
                <div className={styles.content}>
                    <Dot title="FAQ"/>
                    <div className={styles.faq}>
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
                    </div>
                </div>
            </div>
    );
};

export default FrequentlyAskedQuestion;