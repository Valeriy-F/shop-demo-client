import ClientErrorException from './ClientErrorException'

export default class NotFoundException<T> extends ClientErrorException<T> {
}