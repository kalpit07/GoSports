import json
import boto3

BUCKET_NAME = "gosports-polly"


def translate_text(text, fromLanguage, toLanguage):
    translate = boto3.client("translate")
    result = translate.translate_text(
        Text=text, SourceLanguageCode=fromLanguage, TargetLanguageCode=toLanguage)
    return result["TranslatedText"]


def lambda_handler(event, context):
    voice = {"en": ['en-US', 'Joanna'], "fr": ["fr-FR", "Lea"],
             "hi": ["hi-IN", "Aditi"], "zh": ['en-US', 'Kevin']}
    polly = boto3.client("polly")

    details = json.loads(event["body"])
    message = details["message"]

    language = details["language"]
    id = details["id"]
    FILE_NAME = id + ".mp3"
    msg = ""
    if (language == "en"):

        for i in range(len(message)):
            if (i % 2) != 0:
                msg += message[i] + ". "
                continue
            msg += message[i]
    else:

        for i in range(len(message)):
            if (i % 2) != 0:
                msg += message[i] + ". "
                continue
            msg += translate_text(message[i], "en", language) + " "

    response = polly.synthesize_speech(
        Text=msg, VoiceId=voice[language][1], LanguageCode=voice[language][0], OutputFormat="mp3")

    voice_data = response["AudioStream"].read()

    try:
        s3 = boto3.resource("s3")
        s3.Bucket(BUCKET_NAME).put_object(Key=FILE_NAME, Body=voice_data)

        return {
            'statusCode': 200,
            'body': json.dumps('Audio uploaded!')
        }
    except:
        return {
            'statusCode': 400,
            'body': json.dumps('Failed to upload audio file!')
        }
