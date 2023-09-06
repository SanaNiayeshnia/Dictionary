let searchBox=document.getElementById('search-box');
let serachIcon=document.getElementById('search-icon');
let word=document.getElementById('word');
let phonetic=document.getElementById('phonetic');
let meaningBox=document.getElementById('meaning-box');
let volumeIcon=document.getElementById('volume-icon');
let wordAudio=document.getElementById('word-audio');
let wordBox=document.getElementById('word-box');
let errorText=document.getElementById('error-text');



searchBox.addEventListener('keydown', (event)=>{
if(event.key==='Enter'){
    loadWordData();
}
});

serachIcon.addEventListener('click', loadWordData);

function loadWordData(){
let serachInput=searchBox.value;
console.log('search');
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${serachInput}`).then((res)=>{
    if(res.status===200)
    return res.json();
}).then((data)=>{
    console.log(data);

    errorText.style.display='none';
    wordBox.style.display='block';
    //deleting old data
    meaningBox.querySelectorAll('*').forEach(child=> child.remove());

    //loading word
    word.innerHTML=data[0].word;
    //loading phonetic
    if(data[0].phonetics[0]?.text)
    phonetic.innerHTML=data[0].phonetics[0].text;
    else
    phonetic.innerHTML=data[0].phonetics[1].text;

    //loading the meaninngs based on ther part of speech
    let definitionText="";
    let fragment=document.createDocumentFragment();
    data[0].meanings.forEach(m => {
        m.definitions.forEach(d=>{
            definitionText+=d.definition+" ";
        })

        let partOfSpeech=document.createElement('p');
        partOfSpeech.className='part-of-speech';
        partOfSpeech.innerHTML=m.partOfSpeech;

        let meaning=document.createElement('p');
        meaning.className='meaning';
        meaning.innerHTML=definitionText;

        fragment.append(partOfSpeech, meaning);
    
        definitionText="";
    });

    meaningBox.append(fragment);

    //loading word audio
    volumeIcon.addEventListener('click', ()=>{
        if(data[0].phonetics[0]?.audio)
        wordAudio.setAttribute('src', data[0].phonetics[0].audio);
        else
        wordAudio.setAttribute('src', data[0].phonetics[1].audio);
        wordAudio.play();
    
    })
    
    
}).catch(()=>{
   meaningBox.querySelectorAll('*').forEach(child=> child.remove());
   wordBox.style.display='none';
   errorText.style.display='block';

})
}

