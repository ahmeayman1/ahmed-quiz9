const questions = [
  {q:"Infertility is defined as inability to conceive after one year of regular, unprotected sexual intercourse.", a:true},
  {q:"Sterility and infertility are always identical terms with no clinical distinction.", a:false},
  {q:"Infertility may include inability to produce a viable offspring, including habitual abortion.", a:true},
  {q:"Fecundability refers to the monthly probability that a couple will conceive.", a:true},
  {q:"After one year of regular intercourse the cumulative probability of conception is approximately 95–100%.", a:true},
  {q:"Primary infertility refers to couples who have never achieved a conception.", a:true},
  {q:"Secondary infertility includes failure to conceive even when prior lactational amenorrhea exists.", a:false},
  {q:"Regular sexual life includes intercourse 3–4 times per week with ejaculation in the posterior fornix.", a:true},
  {q:"Reported causes for rising infertility include STIs, older age at marriage, pollution, and better diagnostics.", a:true},
  {q:"Female factors account for about 50% of infertility, male 30%, sexual factors 10%, unexplained 10%.", a:true},
  {q:"Male infertility causes include semen production defects, vas obstruction, and failure of deposition.", a:true},
  {q:"Congenital causes of reduced semen production include undescended or absent testis.", a:true},
  {q:"Mumps and measles are inflammatory causes impairing semen production.", a:true},
  {q:"Varicocele is dilated tortuous pampiniform plexus veins and a cause of male infertility.", a:true},
  {q:"Hot baths and tight underwear are major emphasized physical causes of male infertility.", a:false},
  {q:"Bilateral vas obstruction may result from congenital, inflammatory, traumatic, surgical, or radiation causes.", a:true},
  {q:"Retrograde ejaculation occurs when semen passes into the bladder.", a:true},
  {q:"Hypospadias and epispadias can affect semen deposition.", a:true},
  {q:"Female infertility causes include ovarian, tubal, uterine, cervical, vaginal, and systemic factors.", a:true},
  {q:"Anovulation may result from hypothalamic, pituitary, or ovarian dysfunction.", a:true},
  {q:"Luteal phase defect is a possible ovarian cause of infertility.", a:true},
  {q:"Tubal factors cause about 20% of infertility and include chlamydia and gonorrhea as common causes.", a:true},
  {q:"Uterine factors (~5%) include congenital anomalies, TB endometritis, Asherman’s syndrome, and tumors.", a:true},
  {q:"Cervical causes (~5%) include stenosis, cervicitis, displacement, antibodies, and neoplasms.", a:true},
  {q:"Vaginal factors are the most common cause of female infertility.", a:false},
  {q:"General systemic factors include endocrine disorders, TB, anemia, and psychological disorders.", a:true},
  {q:"Disturbed sexual life includes dyspareunia, vaginismus, frigidity, and effluvium seminis.", a:true},
  {q:"Unexplained infertility accounts for about 5–10% of cases after full evaluation.", a:true},
  {q:"Initial infertility evaluation starts with history, examination, then semen analysis.", a:true},
  {q:"If semen analysis is normal, the next step is detection of ovulation.", a:true},
  {q:"A normal postcoital test eliminates the need to assess tubal patency.", a:false},
  {q:"Hysterosalpingography is used to assess tubal patency.", a:true},
  {q:"Laparoscopy and hysteroscopy are used when other investigations are normal.", a:true},
  {q:"WHO normal semen: volume 2–6 mL, count 20–60 million/mL, motility >60%, morphology >60%.", a:true},
  {q:"Aspermia is absence of semen; azoospermia is absence of sperm.", a:true},
  {q:"Oligospermia is sperm count less than 20 million/mL.", a:true},
  {q:"Asthenospermia is poor motility; teratospermia is abnormal forms.", a:true},
  {q:"Testicular biopsy helps differentiate obstruction from testicular failure.", a:true},
  {q:"Vasography involves dye injection into vas deferens with X-ray imaging.", a:true},
  {q:"Urine analysis after ejaculation helps diagnose retrograde ejaculation.", a:true},
  {q:"Hormonal evaluation may include testosterone, LH, and FSH.", a:true},
  {q:"BBT, PEB, ultrasound folliculometry, and hormones detect ovulation.", a:true},
  {q:"Progesterone ≥10 ng/mL on day 22 indicates adequate luteal phase.", a:true},
  {q:"Endoscopy can visualize ovulation stigma on ovarian surface.", a:true},
  {q:"HSG assesses tubal patency and treatment targets the cause found.", a:true},
  {q:"ART such as AI, IVF-ET, and ICSI are options for refractory infertility.", a:true}
];

let index=0;
let answered=false;
let results=[];

const qText=document.getElementById("questionText");
const counter=document.getElementById("counter");
const trueBtn=document.getElementById("trueBtn");
const falseBtn=document.getElementById("falseBtn");
const nextBtn=document.getElementById("nextBtn");
const retryBtn=document.getElementById("retryBtn");
const qList=document.getElementById("questionsList");

function toggleMenu(){
  const m=document.getElementById("sideMenu");
  const o=document.getElementById("overlay");
  if(m.style.right==="0px"){m.style.right="-250px";o.style.display="none";}
  else{m.style.right="0";o.style.display="block";}
}

function startQuiz(){
  shuffle();
  index=0;
  results=Array(questions.length).fill(null);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.querySelector(".options").style.display="flex";
  document.getElementById("questionsBtn").style.display="block";
  retryBtn.style.display="none";
  loadQuestion();
}

function loadQuestion(){
  answered=false;
  trueBtn.style.background="#3498db";
  falseBtn.style.background="#3498db";
  nextBtn.style.display="none";
  counter.innerText=`Question ${index+1} / ${questions.length}`;
  qText.innerText=questions[index].q;
}

function answer(val){
  if(answered) return;
  answered=true;
  const correct=questions[index].a;
  results[index]=(val===correct);

  if(val===correct){
    (val?trueBtn:falseBtn).style.background="#27ae60";
  }else{
    (val?trueBtn:falseBtn).style.background="#e74c3c";
    (correct?trueBtn:falseBtn).style.background="#27ae60";
  }

  if(results.every(r=>r!==null)){
    finishQuiz();
  }else{
    nextBtn.style.display="inline-block";
  }
}

function nextQuestion(){
  index = results.findIndex((r,i)=>r===null && i>index);
  if(index===-1){
    index = results.findIndex(r=>r===null);
  }
  loadQuestion();
}

function finishQuiz(){
  qText.innerText=`✅ Finished — Score: ${results.filter(r=>r).length} / ${questions.length}`;
  document.querySelector(".options").style.display="none";
  document.getElementById("questionsBtn").style.display="none";
  nextBtn.style.display="none";
  retryBtn.style.display="inline-block";
}

function retryQuiz(){
  startQuiz();
}

function toggleQuestions(){
  qList.innerHTML="";
  qList.style.display=qList.style.display==="block"?"none":"block";
  results.forEach((r,i)=>{
    const d=document.createElement("div");
    d.className="q-item "+(r===true?"correct":r===false?"wrong":"unanswered");
    d.innerText=i+1;
    d.onclick=()=>{
      index=i;
      loadQuestion();
      qList.style.display="none";
    };
    qList.appendChild(d);
  });
}

function shuffle(){
  questions.sort(()=>Math.random()-0.5);
}