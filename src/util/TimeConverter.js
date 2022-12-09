export default function convert2minutes(miliseconds){
    let minutes = Math.trunc(miliseconds/60000)
    let seconds = Math.trunc(((miliseconds/60000)%1)*60)

    return minutes+' Minutos y '+seconds+' segundos.'


}