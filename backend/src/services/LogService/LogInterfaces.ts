export interface ILogFields{
	level:string,
	message:string,
	resourceId:string,
	timestamp:Date,
	traceId:string,
	spanId:string,
	commit:string,
	metadata: ILogFieldsMetadata
}

export interface ILogFieldsMetadata{
	parentResourceId:string
}
