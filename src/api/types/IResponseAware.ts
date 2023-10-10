import { ResponseInfo } from './TApi'

export default interface IResponseAwere<T> {
    getResponseInfo(): ResponseInfo<T>
}