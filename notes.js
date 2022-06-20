const { default: chalk } = require('chalk')
const fs = require('fs')
const addNote = (title, body)=>{
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note)=>//create a new Array that matches the  condition
    //     note.title === title
    // )
    const duplicateNote = notes.find(note=>note.title === title)//once it finds it should break
    // console.log(duplicateNotes)
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        // console.log(notes)
        saveNote(notes)
        console.log(chalk.green.inverse("New Note Added"))
    }else{
        console.log(chalk.red.inverse("Note Title Already Taken"))
    }
    
    
}
const saveNote = (notes)=>{
    fs.writeFileSync("notes.json",JSON.stringify(notes))
}
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()//read file needs tostring conversion to display ---refer playground
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}
const removeNote = (title)=>{
    // console.log(title)
    const notes = loadNotes()
    const noteTokeep = notes.filter((note)=>//
        note.title !== title
    )
    if(noteTokeep.length !== notes.length){
        saveNote(noteTokeep)
        console.log(noteTokeep)
        console.log(chalk.inverse.green("Note Removed!"))
    }else{
        console.log(chalk.inverse.red("No Note Found!"))
    }
   

}
const listNote = ()=>{
    console.log(chalk.green.inverse("Your Notes"))
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(element.title)
    });
}
const readNote = (title)=>{
    const notes = loadNotes()
    const notefound = notes.find((note)=>note.title == title)
    if(notefound==undefined){
        console.log(chalk.red.inverse("No Note Found"))
    }else{
        console.log(chalk.inverse(notefound.title))
        console.log(notefound.body)
    }

}
module.exports = {
    addNote  : addNote,
    removeNote:removeNote,
    listNotes:listNote,
    readNote:readNote
    
    
}