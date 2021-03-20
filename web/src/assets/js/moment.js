
import moment from 'moment'
moment.fn.dateCn = function(){
    return this.format('YYYY-MM-DD');
}
moment.fn.dateEn = function(){
    return this.format('D MMM YYYY');
}
moment.fn.timeCn = function(){
    return this.format('YYYY-MM-DD HH:mm:ss');
}
moment.fn.timeEn = function(){
    return this.format('D MMM YYYY HH:mm:ss');
}
moment.fn.iso = function(){
    return this.toISOString();
}
moment.fn.dateZeroIso = function(){
    let newDate = this.format('YYYY-MM-DD');
    return moment(newDate).toISOString();
}
export default moment;