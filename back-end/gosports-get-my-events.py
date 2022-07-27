import json
import boto3

translate = boto3.client("translate")


def translate_text(text, fromLanguage, toLanguage):
    result = translate.translate_text(
        Text=text, SourceLanguageCode=fromLanguage, TargetLanguageCode=toLanguage)
    return result["TranslatedText"]


def lambda_handler(event, context):
    details = json.loads(event["body"])
    language = details["language"]
    email = details["email"]

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('eventInfo-GoSports')
    response = table.scan()
    data = response['Items']

    result = []
    for item in data:
        if (item["created_by"] == email):
            if item["language"] == language:
                result.append(item)
            else:
                item["description"] = translate_text(
                    item["description"], item["language"], language)
                item["title"] = translate_text(
                    item["title"], item["language"], language)
                item["location"] = translate_text(
                    item["location"], item["language"], language)
                result.append(item)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({"events": result})
    }
