import json
import boto3


def lambda_handler(event, context):
    print(event)
    details = event
    details["registered_users"] = []

    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("eventInfo-GoSports")

    try:
        table.put_item(Item=details)

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps('Booking successful!')
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
