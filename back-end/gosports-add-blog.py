import json
import boto3


def lambda_handler(event, context):
    print(event)
    details = json.loads(event["body"])

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("blogInfo-GoSports")

    try:
        table.put_item(Item=details)

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps('Blog added!')
        }
    except:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps('Something went wrong!')
        }
