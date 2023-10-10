import ClientErrorException from './ClientErrorException'

export default class ConflictException<T> extends ClientErrorException<T> {
}