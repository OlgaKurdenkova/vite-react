import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState("home");
  const [quizCode, setQuizCode] = useState("");
  const [questions, setQuestions] = useState([]);
  const [savedQuizzes, setSavedQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctIndex: 0,
    media: null,
    mediaType: null,
  });
  const [quizCount, setQuizCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const leaderboard = [
    { name: "Лиса123", score: 150 },
    { name: "Огонёк", score: 120 },
    { name: "SmartFox", score: 100 },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("admin") === "1") {
      setIsAdmin(true);
      setIsPaid(true);
    }
  }, []);

  const handleJoinGame = () => {
    if (quizCode.trim()) {
      alert(`Подключение к викторине с кодом: ${quizCode}`);
    }
  };

  const handleAddQuestion = () => {
    if (!isPaid && questions.length >= 10) {
      alert("Бесплатная викторина может содержать максимум 10 вопросов.");
      return;
    }
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ question: "", options: ["", "", "", ""], correctIndex: 0, media: null, mediaType: null });
  };

  const handleFinishCreation = () => {
    if (!isPaid && quizCount >= 2) {
      alert("Вы уже создали 2 бесплатные викторины. Чтобы создать больше — оплатите доступ.");
      return;
    }
    const quizId = Math.floor(100000 + Math.random() * 900000).toString();
    const newQuiz = {
      id: quizId,
      questions,
      createdAt: new Date().toLocaleString(),
    };
    setSavedQuizzes([...savedQuizzes, newQuiz]);
    alert(`Викторина создана! Код: ${quizId}`);
    setQuizCount(quizCount + 1);
    setQuestions([]);
    setStep("home");
  };

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setStep("playSaved");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-600 to-purple-800 text-white p-6 flex flex-col items-center justify-center">
      <motion.div className="flex flex-col items-center gap-3 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className="text-4xl font-extrabold tracking-wide"></h1>
      </motion.div>

      {step === "home" && (
        <>
          <motion.h1 className="text-5xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Добро пожаловать в QuizRush!
          </motion.h1>

          <motion.p className="text-xl text-center max-w-xl mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            Участвуйте в весёлых викторинах или создавайте свои игры!
            Быстро. Легко. Увлекательно.
          </motion.p>

          <div className="flex gap-6 flex-wrap justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="text-lg px-6 py-3 rounded-2xl shadow-lg" onClick={() => setStep("join")}>Играть</Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="text-lg px-6 py-3 rounded-2xl shadow-lg" variant="secondary" onClick={() => setStep("create")}>Создать викторину</Button>
            </motion.div>

            {savedQuizzes.length > 0 && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="text-lg px-6 py-3 rounded-2xl shadow-lg" variant="outline" onClick={() => setStep("saved")}>Мои викторины</Button>
              </motion.div>
            )}
          </div>

          <motion.div className="mt-16 max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <Card className="bg-white bg-opacity-10 border-white border-opacity-20 rounded-2xl shadow-xl">
              <CardContent className="p-6 text-center">
                <p className="text-white text-sm">
                  Бесплатно вы можете создать 2 викторины (до 10 вопросов каждая). <br />
                  Хотите больше? Получите доступ к безлимитным викторинам после быстрой оплаты. <br />
                  <span className="font-semibold">QuizRush</span> — платформа, где весело учиться и играть!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="mt-12 w-full max-w-md text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
            <h2 className="text-2xl font-bold mb-4">🔥 Доска лидеров</h2>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 space-y-2 shadow-lg">
              {leaderboard.map((user, index) => (
                <motion.div key={index} className="flex justify-between px-4 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold shadow-md" whileHover={{ scale: 1.02 }}>
                  <span>{user.name}</span>
                  <span>{user.score} очков</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {step === "saved" && (
        <motion.div className="w-full max-w-xl text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold mb-6">Мои викторины</h2>
          {savedQuizzes.map((quiz, idx) => (
            <div key={idx} className="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
              <p className="text-white text-lg font-semibold mb-2">Код: {quiz.id}</p>
              <p className="text-white text-sm mb-2">Создана: {quiz.createdAt}</p>
              <Button onClick={() => handleSelectQuiz(quiz)}>Играть</Button>
            </div>
          ))}
          <Button variant="ghost" className="mt-4" onClick={() => setStep("home")}>Назад</Button>
        </motion.div>
      )}

      {step === "playSaved" && selectedQuiz && (
        <motion.div className="w-full max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-6 text-center">Викторина: {selectedQuiz.id}</h2>
          {selectedQuiz.questions.map((q, idx) => (
            <div key={idx} className="mb-6 p-4 rounded-xl bg-white bg-opacity-10">
              <p className="text-white font-semibold">Вопрос {idx + 1}: {q.question}</p>
              <ul className="mt-2 space-y-1">
                {q.options.map((opt, i) => (
                  <li key={i} className={`text-white ${i === q.correctIndex ? 'font-bold' : ''}`}>— {opt}</li>
                ))}
              </ul>
            </div>
          ))}
          <Button variant="ghost" className="mt-4" onClick={() => setStep("home")}>Назад</Button>
        </motion.div>
      )}

      {/* Остальные шаги: join, create и т.д. */}

      {step === "join" && (
        <motion.div className="w-full max-w-md text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold mb-4">Введите код викторины</h2>
          <input type="text" value={quizCode} onChange={(e) => setQuizCode(e.target.value)} className="w-full p-3 rounded-lg text-black text-lg mb-4" placeholder="Например, 123456" />
          <Button className="w-full text-lg py-3" onClick={handleJoinGame}>Присоединиться</Button>
          <div className="mt-4">
            <button onClick={() => setStep("home") } className="text-sm underline text-white opacity-70 hover:opacity-100">Назад на главную</button>
          </div>
        </motion.div>
      )}

      {step === "create" && (
        <motion.div className="w-full max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-6 text-center">Создание викторины</h2>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl space-y-4">
            <input type="text" placeholder="Введите вопрос" value={currentQuestion.question} onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })} className="w-full p-3 rounded text-black" />
            <div>
              <label className="block text-white text-sm mb-2">Прикрепить медиа:</label>
              <input type="file" accept="image/*,audio/*,video/*" onChange={(e) => {
                const file = e.target.files[0];
                const type = file?.type.startsWith("image") ? "image" : file?.type.startsWith("video") ? "video" : "audio";
                setCurrentQuestion({ ...currentQuestion, media: file, mediaType: type });
              }} className="text-white text-sm" />
            </div>
            {currentQuestion.options.map((option, idx) => (
              <input key={idx} type="text" placeholder={`Вариант ${idx + 1}`} value={option} onChange={(e) => {
                const updatedOptions = [...currentQuestion.options];
                updatedOptions[idx] = e.target.value;
                setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
              }} className="w-full p-2 rounded text-black" />
            ))}
            <div className="text-white text-sm">
              <label>Правильный ответ: </label>
              <select value={currentQuestion.correctIndex} onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctIndex: parseInt(e.target.value) })} className="ml-2 text-black rounded p-1">
                {[0, 1, 2, 3].map((i) => (<option key={i} value={i}>{`Вариант ${i + 1}`}</option>))}
              </select>
            </div>
            <div className="flex gap-4 mt-4">
              <Button onClick={handleAddQuestion}>Добавить вопрос</Button>
              <Button variant="secondary" onClick={handleFinishCreation}>Завершить</Button>
              <Button variant="ghost" onClick={() => setStep("home")}>Отмена</Button>
            </div>
            {!isPaid && <div className="text-xs text-white mt-4 opacity-80">В бесплатной версии можно добавить до 10 вопросов.</div>}
          </div>
        </motion.div>
      )}
    </main>
  );
}
