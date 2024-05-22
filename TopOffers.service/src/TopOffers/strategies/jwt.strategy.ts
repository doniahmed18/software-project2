
import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable} from "@nestjs/common";
import { TopOffersService } from "../TopOffers.service";
//import { LoginDto } from "../dto/login.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'local'){
constructor(private readonly identityService:TopOffersService){
    super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration:false,
        secretOrKey:'secretKey_YoucANWritewhateveryoulike',
    });
}
async validate(payload: any):Promise<any>{
    console.log(payload);//from jwt token

    
    return payload;
}
}