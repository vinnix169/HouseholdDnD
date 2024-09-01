import axios from 'axios';
import { Levels } from './types';

export const CalculateLevel = async (lvl: number, exp:number, levels: Levels[], userID: number) => {

    const nextLVL: Levels[] = []




        //check if we can level up
       if (exp >= levels[lvl-1].exp) {
   
            const findLevel = levels.find((v) => v.exp > exp)
            if (findLevel) {
               
                nextLVL.push(findLevel)
                
            }
        }   
    
        //check if we can level down
        if (exp < levels[lvl-2]?.exp) {

            const findLevel = levels.filter((v) => v.exp <= exp)

            if(findLevel[0] != undefined) {
                nextLVL.push(findLevel[findLevel.length-1])
            } else {
                nextLVL.push({level: 1, exp: exp})
            }
        }


        if (nextLVL.length > 0) {
            const lvlup = {nextLVL: nextLVL[0].level}
            await axios.put("http://localhost:8000/user/lvlUp/" + userID, lvlup)
            .then(() => window.location.reload())
            .catch((err) => console.error(err))
            console.log("Level up to: " + lvlup.nextLVL )
        }
    
            
        
    }
    

