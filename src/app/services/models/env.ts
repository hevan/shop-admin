
import * as moment from 'moment';

export class Utils {
  public static toDateStruct(dateStr:string):any {
    let dateStrunct = {
      "year": +dateStr.substring(0, 4),
      "month": +dateStr.substring(5, 7),
      "day": +dateStr.substring(8, 10)
    };
    return dateStrunct;
  }

  public static getHour(dateStr:string):any {
    return dateStr.substring(11, 13);
  }

  public static getMinutes(dateStr:string):any {
    return dateStr.substring(14, 16);
  }

  public static getSS(dateStr:string):any {
    return dateStr.substring(18, 20);
  }

  public static getCurrentDatastruct():any{
    let dayDate = moment();

    let dataStruct = {'year':dayDate.year(), 'month':dayDate.month()+1, 'day':dayDate.date()};
    return dataStruct;
  }

  public static getCurrentAlert():any{
    let dayDate = moment();

    let dataStruct ={'year':dayDate.year(), 'month':dayDate.month()+1, 'day':dayDate.date()+3};
    return dataStruct;

  }

  public static toMonth(month:string):any {
    let dateStrunct = {"year": +month.substring(0, 4), "month": +month.substring(5, 7),};
    return dateStrunct;
  }

  public static dateStructToString(dateStruct) {
    if (dateStruct) {
      return dateStruct.year + '-' + this.formatTwo(dateStruct.month) + '-' + this.formatTwo(dateStruct.day);
    } else {
      return '';
    }
  }

  public static formatTwo(data:number):any {
    let dataStr = data + '';
    if (dataStr.length < 2) {
      return '0' + dataStr;
    } else {
      return dataStr;
    }
  }

  public static toTimeStruct(dateStr):any {
    let dateStrunct = {"hour": +dateStr.substring(0, 2), "minute": +dateStr.substring(3, 5)};
    return dateStrunct;
  }

  public static zerosize(value, length) {
    if (!length) length = 2;
    value = String(value);
    for (var i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0';
    }
    return zeros + value;
  }
}

export class Keys {
  static KEY_TOKEN:string = "term_token";
  static KEY_USER_INFO:string = "term_user_info";
  static KEY_USER:string = "term_user";  
  static SERVER_URL:string = 'http://139.129.202.208/term-sale'; 
  //static SERVER_URL:string = 'http://139.129.202.208:9085/labour';
  //static SERVER_URL:string = 'http://120.78.80.186:81/labour'; 
  static SERVER_UPLOAD_URL: string = 'http://139.129.202.208/term-sale'; 
  //static SERVER_UPLOAD_URL: string = 'http://139.129.202.208:9085/labour'; 
  //static SERVER_UPLOAD_URL: string = 'http://120.78.80.186:81/labour';
 } 
