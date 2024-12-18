import { Dispatch, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useAlert from "../../components/useAlert";
import { useCreateProviderServiceOnboarding } from "../../../api/api-services/cloudProviderQuery";
import modeAtomsAtom from "../../../atoms/modeAtoms.atom";
import { FaCopy, FaKey } from "react-icons/fa";
import awsImg from "../../../../../public/media/logos/awsfile.svg";
import code from "../../../../../public/media/logos/code.svg";

type Props = {
  goBack: Dispatch<void>;
  handleHide: Dispatch<void>;
  inModal: boolean;
  next: Dispatch<void>;
};

const StepFour = ({ goBack, handleHide, inModal, next }: Props) => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [type, setType] = useState("");
  const [arn, setArn] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isCopiedII, setIsCopiedII] = useState(false);
  const [payload, setPayload] = useState<any>(null);
  const { showAlert, Alert } = useAlert();

  const { mutate, isLoading } = useCreateProviderServiceOnboarding();

  useEffect(() => {
    const localType = sessionStorage.getItem("type");
    const localData = sessionStorage.getItem("data");
    if (localType && localData) {
      setType(localType);
      const parsedData = JSON.parse(localData);
      setPayload({ ...payload, ...parsedData });
    }
  }, []);

  // console.log(type);
  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.setAttribute("type", "hidden");
    link.href =
      "../../../../../public/media/logos/02 Producing Data, Sampling.pdf";
    link.download = "CloudFormation template";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "acm:DescribeCertificate",
        "acm:ListCertificates",
        "acm:ListTagsForCertificate",
        "apigateway:GET",
        "autoscaling:DescribeAccountLimits",
        "autoscaling:DescribeAutoScalingGroups",
        "autoscaling:DescribeAutoScalingInstances",
        "autoscaling:DescribeLaunchConfigurations",
        "autoscaling:DescribeLoadBalancerTargetGroups",
        "autoscaling:DescribeLoadBalancers",
        "autoscaling:DescribeNotificationConfigurations",
        "autoscaling:DescribeTags",
        "cloudformation:DescribeAccountLimits",
        "cloudformation:DescribeStackDriftDetectionStatus",
        "cloudformation:DescribeStacks",
        "cloudformation:DetectStackDrift",
        "cloudformation:GetStackPolicy",
        "cloudformation:ListStacks",
        "cloudfront:GetDistribution",
        "cloudfront:ListDistributions",
        "cloudfront:ListTagsForResource",
        "cloudtrail:DescribeTrails",
        "cloudtrail:GetTrailStatus",
        "cloudtrail:GetEventSelectors",
        "cloudtrail:ListTags",
        "cloudwatch:DescribeAlarms",
        "cloudwatch:DescribeAlarmsForMetric",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:ListMetrics",
        "config:DescribeComplianceByConfigRule",
        "config:DescribeConfigRules",
        "config:DescribeConfigurationRecorderStatus",
        "config:DescribeConfigurationRecorders",
        "config:DescribeDeliveryChannelStatus",
        "config:DescribeDeliveryChannels",
        "config:GetComplianceDetailsByConfigRule",
        "config:GetResourceConfigHistory",
        "config:SelectResourceConfig",
        "dynamodb:DescribeContinuousBackups",
        "dynamodb:DescribeLimits",
        "dynamodb:DescribeTable",
        "dynamodb:ListBackups",
        "dynamodb:ListTables",
        "dynamodb:ListTagsOfResource",
        "ec2:DescribeAccountAttributes",
        "ec2:DescribeAddresses",
        "ec2:DescribeEgressOnlyInternetGateways",
        "ec2:DescribeFlowLogs",
        "ec2:DescribeImages",
        "ec2:DescribeInstanceAttribute",
        "ec2:DescribeInstanceStatus",
        "ec2:DescribeInstances",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeKeyPairs",
        "ec2:DescribeNatGateways",
        "ec2:DescribeNetworkAcls",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeReservedInstances",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSecurityGroupReferences",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSnapshots",
        "ec2:DescribeSnapshotAttribute",
        "ec2:DescribeSubnets",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:DescribeVpcAttribute",
        "ec2:DescribeVpcEndpoints",
        "ec2:DescribeVpcPeeringConnections",
        "ec2:DescribeVpcs",
        "ec2:DescribeVpnConnections",
        "ec2:DescribeVpnGateways",
        "ec2:GetEbsEncryptionByDefault",
        "elasticfilesystem:DescribeFileSystems",
        "elasticfilesystem:DescribeTags",
        "elasticmapreduce:DescribeCluster",
        "elasticmapreduce:ListClusters",
        "elasticmapreduce:ListInstances",
        "es:DescribeElasticsearchDomain",
        "es:DescribeElasticsearchDomainConfig",
        "es:DescribeElasticsearchDomains",
        "es:DescribeElasticsearchInstanceTypeLimits",
        "es:DescribeReservedElasticsearchInstanceOfferings",
        "es:DescribeReservedElasticsearchInstances",
        "es:ListDomainNames",
        "es:ListElasticsearchInstanceTypes",
        "es:ListElasticsearchVersions",
        "es:ListTags",
        "elasticache:DescribeCacheClusters",
        "elasticache:DescribeReplicationGroups",
        "elasticache:DescribeReservedCacheNodes",
        "elasticache:ListTagsForResource",
        "elasticloadbalancing:DescribeListeners",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeLoadBalancerPolicies",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeTags",
        "elasticloadbalancing:DescribeTargetGroups",
        "elasticloadbalancing:DescribeTargetHealth",
        "elasticloadbalancing:DescribeRules",
        "iam:GenerateCredentialReport",
        "iam:GetAccessKeyLastUsed",
        "iam:GetAccountAuthorizationDetails",
        "iam:GetAccountPasswordPolicy",
        "iam:GetAccountSummary",
        "iam:GetCredentialReport",
        "iam:GetGroup",
        "iam:GetGroupPolicy",
        "iam:GetLoginProfile",
        "iam:GetOpenIDConnectProvider",
        "iam:GetPolicy",
        "iam:GetPolicyVersion",
        "iam:GetRole",
        "iam:GetRolePolicy",
        "iam:GetSAMLProvider",
        "iam:GetServerCertificate",
        "iam:GetUser",
        "iam:GetUserPolicy",
        "iam:ListAccessKeys",
        "iam:ListAccountAliases",
        "iam:ListAttachedGroupPolicies",
        "iam:ListAttachedRolePolicies",
        "iam:ListAttachedUserPolicies",
        "iam:ListEntitiesForPolicy",
        "iam:ListGroupPolicies",
        "iam:ListGroups",
        "iam:ListInstanceProfiles",
        "iam:ListInstanceProfilesForRole",
        "iam:ListMFADevices",
        "iam:ListOpenIDConnectProviders",
        "iam:ListPolicies",
        "iam:ListPolicyTags",
        "iam:ListPolicyVersions",
        "iam:ListRolePolicies",
        "iam:ListRoleTags",
        "iam:ListRoles",
        "iam:ListSAMLProviders",
        "iam:ListSSHPublicKeys",
        "iam:ListServerCertificates",
        "iam:ListUserPolicies",
        "iam:ListUserTags",
        "iam:ListUsers",
        "iam:ListVirtualMFADevices",
        "kms:DescribeKey",
        "kms:GetKeyPolicy",
        "kms:GetKeyRotationStatus",
        "kms:ListAliases",
        "kms:ListGrants",
        "kms:ListKeyPolicies",
        "kms:ListKeys",
        "kms:ListResourceTags",
        "lambda:GetAccountSettings",
        "lambda:GetFunctionConfiguration",
        "lambda:GetPolicy",
        "lambda:ListEventSourceMappings",
        "lambda:ListFunctions",
        "lambda:ListTags",
        "lambda:ListFunctionUrlConfigs",
        "lambda:ListLayers",
        "logs:DescribeLogGroups",
        "logs:DescribeMetricFilters",
        "rds:DescribeAccountAttributes",
        "rds:DescribeDBClusters",
        "rds:DescribeDBInstances",
        "rds:DescribeDBSecurityGroups",
        "rds:DescribeDBSnapshotAttributes",
        "rds:DescribeDBSnapshots",
        "rds:DescribeDBParameters",
        "rds:DescribeDBParameterGroups",
        "rds:DescribeEvents",
        "rds:DescribeEventSubscriptions",
        "rds:DescribeReservedDBInstances",
        "rds:ListTagsForResource",
        "redshift:DescribeClusterParameterGroups",
        "redshift:DescribeClusterParameters",
        "redshift:DescribeClusters",
        "redshift:DescribeLoggingStatus",
        "redshift:DescribeReservedNodes",
        "redshift:DescribeTags",
        "route53:GetDNSSEC",
        "route53:GetGeoLocation",
        "route53:ListHostedZones",
        "route53:ListResourceRecordSets",
        "route53:ListTagsForResource",
        "route53domains:ListDomains",
        "route53domains:ListTagsForDomain",
        "ses:GetIdentityDkimAttributes",
        "ses:GetIdentityPolicies",
        "ses:GetIdentityVerificationAttributes",
        "ses:ListIdentities",
        "ses:ListIdentityPolicies",
        "sns:GetTopicAttributes",
        "sns:ListTopics",
        "sns:ListSubscriptionsByTopic",
        "sns:ListTagsForResource",
        "sqs:GetQueueAttributes",
        "sqs:ListQueues",
        "sqs:ListQueueTags",
        "tag:GetResources",
        "tag:GetTagKeys",
        "tag:GetTagValues"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}`);
  };
  const copyToClipBoardII = () => {
    navigator.clipboard.writeText(`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "access-analyzer:ListAnalyzers",
        "access-analyzer:ListFindings",
        "application-autoscaling:DescribeScalableTargets",
        "application-autoscaling:DescribeScalingActivities",
        "application-autoscaling:DescribeScalingPolicies",
        "application-autoscaling:DescribeScheduledActions",
        "athena:GetQueryExecution",
        "athena:ListQueryExecutions",
        "athena:ListTagsForResource",
        "backup:DescribeBackupVault",
        "backup:ListBackupVaults",
        "backup:ListRecoveryPointsByResource",
        "backup:GetBackupVaultAccessPolicy",
        "ce:GetAnomalies",
        "ce:GetAnomalyMonitors",
        "cloudwatch:GetMetricData",
        "dax:DescribeClusters",
        "dax:ListTags",
        "dms:DescribeReplicationInstances",
        "dms:ListTagsForResource",
        "ds:DescribeDirectories",
        "ds:ListTagsForResource",
        "ec2:DescribeTransitGatewayPeeringAttachments",
        "ec2:SearchTransitGatewayRoutes",
        "ec2:DescribeTransitGatewayRouteTables",
        "ec2:DescribeTransitGateways",
        "ec2:DescribeTransitGatewayAttachments",
        "elasticbeanstalk:DescribeConfigurationSettings",
        "elasticbeanstalk:DescribeEnvironments",
        "ecr:DescribeRepositories",
        "ecr:GetRepositoryPolicy",
        "ecr:GetLifecyclePolicy",
        "ecr:DescribeImages",
        "eks:DescribeCluster",
        "eks:ListClusters",
        "events:DescribeEventBus",
        "events:ListRules",
        "firehose:DescribeDeliveryStream",
        "firehose:ListDeliveryStreams",
        "firehose:ListTagsForDeliveryStream",
        "kafka:DescribeCluster",
        "kafka:ListClusters",
        "kafka:ListNodes",
        "mq:DescribeBroker",
        "mq:ListBrokers",
        "glue:GetDataCatalogEncryptionSettings",
        "glue:GetSecurityConfiguration",
        "glue:GetSecurityConfigurations",
        "glue:GetDatabases",
        "guardduty:GetDetector",
        "guardduty:GetFindings",
        "guardduty:ListDetectors",
        "guardduty:ListFindings",
        "health:DescribeAffectedEntities",
        "health:DescribeEventDetails",
        "health:DescribeEvents",
        "inspector:DescribeAssessmentRuns",
        "inspector:DescribeAssessmentTargets",
        "inspector:DescribeAssessmentTemplates",
        "inspector:DescribeExclusions",
        "inspector:DescribeFindings",
        "inspector:DescribeResourceGroups",
        "inspector:ListAssessmentRuns",
        "inspector:ListAssessmentTargets",
        "inspector:ListAssessmentTemplates",
        "inspector:ListExclusions",
        "inspector:ListFindings",
        "inspector:PreviewAgents",
        "kinesis:ListStreams",
        "kinesis:DescribeStream",
        "kinesis:ListTagsForStream",
        "macie2:GetClassificationExportConfiguration",
        "macie2:GetFindingStatistics",
        "macie2:ListClassificationJobs",
        "organizations:DescribeAccount",
        "organizations:DescribeCreateAccountStatus",
        "organizations:DescribeHandshake",
        "organizations:DescribeOrganization",
        "organizations:DescribeOrganizationalUnit",
        "organizations:DescribePolicy",
        "organizations:ListAWSServiceAccessForOrganization",
        "organizations:ListAccounts",
        "organizations:ListAccountsForParent",
        "organizations:ListChildren",
        "organizations:ListCreateAccountStatus",
        "organizations:ListHandshakesForAccount",
        "organizations:ListHandshakesForOrganization",
        "organizations:ListOrganizationalUnitsForParent",
        "organizations:ListParents",
        "organizations:ListPolicies",
        "organizations:ListPoliciesForTarget",
        "organizations:ListRoots",
        "organizations:ListTargetsForPolicy",
        "rds:DescribeDBClusterParameters",
        "rds:DescribeDBClusterParameterGroups",
        "route53domains:GetDomainDetail",
        "s3:GetAccelerateConfiguration",
        "s3:GetAccountPublicAccessBlock",
        "s3:GetBucketAcl",
        "s3:GetBucketLocation",
        "s3:GetBucketLogging",
        "s3:GetBucketObjectLockConfiguration",
        "s3:GetBucketPolicy",
        "s3:GetBucketPolicyStatus",
        "s3:GetBucketPublicAccessBlock",
        "s3:GetBucketTagging",
        "s3:GetBucketVersioning",
        "s3:GetBucketWebsite",
        "s3:GetEncryptionConfiguration",
        "s3:GetLifecycleConfiguration",
        "s3:ListBucket",
        "s3:ListAllMyBuckets",
        "securityhub:DescribeHub",
        "securityhub:GetEnabledStandards",
        "securityhub:GetFindings",
        "securityhub:GetInsightResults",
        "securityhub:GetInsights",
        "securityhub:GetMasterAccount",
        "securityhub:GetMembers",
        "securityhub:ListEnabledProductsForImport",
        "securityhub:ListInvitations",
        "securityhub:ListMembers",
        "servicequotas:ListServiceQuotas",
        "sagemaker:DescribeNotebookInstance",
        "sagemaker:ListNotebookInstances",
        "sagemaker:ListTags",
        "secretsmanager:DescribeSecret",
        "secretsmanager:ListSecrets",
        "shield:DescribeSubscription",
        "ssm:DescribeParameters",
        "ssm:DescribeSessions",
        "ssm:DescribeInstanceInformation",
        "storagegateway:DescribeNFSFileShares",
        "storagegateway:DescribeSMBFileShares",
        "storagegateway:DescribeTapes",
        "storagegateway:ListFileShares",
        "storagegateway:ListTagsForResource",
        "storagegateway:ListTapes",
        "transfer:DescribeServer",
        "transfer:ListServers",
        "xray:GetEncryptionConfig",
        "waf:GetWebACL",
        "waf:ListWebACLs",
        "wafv2:ListWebACLs",
        "workspaces:DescribeTags",
        "workspaces:DescribeWorkspaces",
        "workspaces:DescribeWorkspacesConnectionStatus",
        "support:DescribeSeverityLevels",
        "support:DescribeTrustedAdvisorChecks",
        "support:DescribeTrustedAdvisorCheckResult",
        "support:DescribeTrustedAdvisorCheckRefreshStatuses",
        "support:RefreshTrustedAdvisorCheck",
        "comprehend:ListKeyPhrasesDetectionJobs",
        "comprehend:ListSentimentDetectionJobs",
        "comprehend:ListTopicsDetectionJobs",
        "comprehend:ListEntitiesDetectionJobs",
        "comprehend:ListDocumentClassificationJobs",
        "comprehend:ListDominantLanguageDetectionJobs",
        "wellarchitected:ListWorkloads",
        "wellarchitected:GetWorkload",
        "ecs:DescribeTaskDefinition",
        "ecs:ListTaskDefinitions",
        "compute-optimizer:GetAutoScalingGroupRecommendations",
        "compute-optimizer:GetEC2InstanceRecommendations",
        "ecs:ListClusters",
        "ecs:ListServices",
        "ecs:DescribeServices",
        "ecs:ListContainerInstances",
        "ecs:DescribeContainerInstances",
        "ecs:DescribeClusters",
        "ecs:ListTagsForResource",
        "appflow:DescribeFlow",
        "appflow:ListFlows"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": "arn:aws:s3:::elasticbeanstalk*"
    }
  ]
}`);
  };

  const launchAutomation = () => {
    window.open(
      "https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2FCloudAccord%2FCloudAccord.template&stackName=CloudAccord&param_AccountId=717210094962&param_ExternalId=84afd050-df26-11ee-b0a8-318c1be8fa0c",
      "_blank"
    );
  };

  const handleCreateServiceProvider = () => {
    mutate(
      {
        data: {
          account_id: null,
          account_name: payload.cloud_name,
          cloud_provider_name: "aws",
          environment: payload.environment,
          onboarding_type: type,
          role_arn: arn,
        },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          next();
        },
        onError: (err: any) => {
          console.log(err);
          showAlert(
            err?.response?.data?.message || "An unknown error occurred",
            "danger"
          );
          //   if (err instanceof Error) {
          //     showAlert(err?.message || "An unknown error occurred", "danger");
          //   }
        },
      }
    );
  };

  useEffect(() => {
    if(isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1200);
    }
    if(isCopiedII) {
      setTimeout(() => {
        setIsCopiedII(false);
      }, 1200);
    }
  }, [isCopied, isCopiedII]);

  return (
    <div
      className={`w-[90%] font-medium rounded-lg border-2 mx-auto md:w-[80%] lg:w-[68%] ${
        mode === "dark" ? "bg-lightDark" : "bg-[#FFFFFF]"
      } ${inModal ? "h-[90vh] overflow-auto" : ""}`}
    >
      <div className="flex items-center p-6 justify-between w-full">
        <div className="flex items-center gap-5">
          <button onClick={() => goBack()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5303 5.46967C12.8232 5.76256 12.8232 6.23744 12.5303 6.53033L7.81066 11.25H18.5C18.9142 11.25 19.25 11.5858 19.25 12C19.25 12.4142 18.9142 12.75 18.5 12.75H7.81066L12.5303 17.4697C12.8232 17.7626 12.8232 18.2374 12.5303 18.5303C12.2374 18.8232 11.7626 18.8232 11.4697 18.5303L5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967Z"
                fill="black"
              />
            </svg>
          </button>
          <p className="text-[18px] font-semibold text-[#373737]">
            {type === "automated"
              ? "Automated setup (recommended)"
              : "Manual setup (DIY)"}
          </p>
        </div>
        <button onClick={() => handleHide()}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.670548 0.670272C0.890218 0.450602 1.24637 0.450602 1.46604 0.670272L5.00028 4.2045L8.53451 0.670272C8.75418 0.450602 9.11033 0.450602 9.33 0.670272C9.54967 0.889942 9.54967 1.2461 9.33 1.46577L5.79577 5L9.33 8.53423C9.54967 8.7539 9.54967 9.11006 9.33 9.32973C9.11033 9.5494 8.75418 9.5494 8.53451 9.32973L5.00028 5.7955L1.46604 9.32973C1.24637 9.5494 0.890218 9.5494 0.670548 9.32973C0.450878 9.11006 0.450879 8.7539 0.670548 8.53423L4.20478 5L0.670548 1.46577C0.450879 1.2461 0.450878 0.889942 0.670548 0.670272Z"
              fill="#373737"
            />
          </svg>
        </button>
      </div>
      <div className="p-6 mt-2 w-full">
        <h2 className="text-[24px] font-semibold mb-4">
          {type === "automated"
            ? "To configure your account using CloudFormation automation"
            : "To configure your account using cross account access"}
        </h2>
        {type === "automated" ? (
          <div className="w-full">
            <div className="flex flex-col gap-4 text-[14px]">
              <p>
                1. Sign in to your target AWS account in another browser tab
              </p>
              <p>
                2. Download and review our{" "}
                <a
                  href="../../../../../public/media/logos/AWSTemplateFormatVersion.pdf"
                  download="AWSTemplateFormatVersion.pdf"
                  className="text-primary underline cursor-pointer"
                >
                  CloudFormation template
                </a>
              </p>
              <p>
                3. Click{" "}
                <span
                  onClick={launchAutomation}
                  className="bg-primary text-white rounded-md p-2 cursor-pointer"
                >
                  Launch Automation
                </span>
              </p>
              <p>
                4. Check "I acknowledge that AWS CloudFormation might create IAM
                resources with custom names." and click Create
              </p>
              <p>
                5. When Stack Creation is finished, go to the Outputs and
                copy CloudAccordRoleArn and paste it below.
              </p>
            </div>
            <p className="my-6 italic text-[14px]">
              Note if the stack is not shown you might need to click refresh
              button.
            </p>
            <img src={awsImg} alt="aws" />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex flex-col gap-4 text-[14px]">
              <p>
                1. Sign in to your target AWS account in another browser tab
              </p>
              <p>
                2. Create <b>IAM Policy:</b> CloudAccordPart1
              </p>
              <div className="pl-6">
                <li className="list-disc border-start-0">
                  Navigate to IAM Policies section
                </li>
                <li className="list-disc border-start-0">
                  Click Create policy
                </li>
                <li className="list-disc border-start-0">
                  Select the JSON tab
                </li>
                <li className="list-disc border-start-0">
                  Copy the content of the following JSON policy document:
                </li>
                <li className="border-start-0 relative">
                  {isCopied && (
                    <p className="text-xs font-medium w-full md:pr-24 text-end text-red-500">
                      content copied to clipboard
                    </p>
                  )}
                  <img
                    src={code}
                    alt="aws response"
                    role="button"
                    className="hover:cursor-pointer "
                    onClick={() => {
                      setIsCopied(true);
                      copyToClipBoard();
                    }}
                  />
                </li>
                <li className="list-disc border-start-0">
                  Replace the content with the copied JSON policy document
                </li>
                {/* <li className="list-disc border-start-0">
                  Click Review policy
                </li> */}
                <li className="list-disc border-start-0">
                  Type CloudAccordPart1 as the Name and choose a Description
                  (optional) for the policy that you are creating
                </li>
                <li className="list-disc border-start-0">
                  Click Create policy
                </li>
              </div>
              <p>
                3. Create <b>IAM Policy:</b> CloudAccordPart2
              </p>
              <div className="pl-6">
                <li className="list-disc border-start-0">
                  Navigate to IAM Policies section
                </li>
                <li className="list-disc border-start-0">
                  Click Create policy
                </li>
                <li className="list-disc border-start-0">
                  Select the JSON tab
                </li>
                <li className="list-disc border-start-0">
                  Copy the content of the following JSON policy document:
                </li>
                <li className="border-start-0 relative">
                  {isCopiedII && (
                    <p className="text-xs font-medium w-full text-end md:pr-24 text-red-500">
                      content copied to clipboard
                    </p>
                  )}
                  <img
                    src={code}
                    alt="aws response"
                    role="button"
                    className="hover:cursor-pointer "
                    onClick={() => {
                      setIsCopiedII(true);
                      copyToClipBoardII();
                    }}
                  />
                </li>
                <li className="list-disc border-start-0">
                  Replace the content with the copied JSON policy document
                </li>
                {/* <li className="list-disc border-start-0">
                  Click Review policy
                </li> */}
                <li className="list-disc border-start-0">
                  Type CloudAccordPart2 as the Name and choose a Description
                  (optional) for the policy that you are creating
                </li>
                <li className="list-disc border-start-0">
                  Click Create policy
                </li>
              </div>
              <p>
                4. Create <b>IAM Policy:</b>
              </p>
              <div className="pl-6">
                <li className="list-disc border-start-0">
                Navigate to IAM Roles section
                </li>
                <li className="list-disc border-start-0">
                Click Create role
                </li>
                <li className="list-disc border-start-0">
                For Select type of trusted entity, choose <b>Another AWS account</b>
                </li>
                <li className="list-disc border-start-0">
                For Account ID, Enter: <code>YOUR PERSONAL ACCOUNT ID</code>
                </li>
                <li className="list-disc border-start-0">
                Check Require external ID and for External ID Enter: <code>YOUR PERSONAL EXTERNAL ID</code> <small className="text-red-500 italic"> - Note: this step is optional</small>
                </li>
                <li className="list-disc border-start-0">
                Do not check the Require MFA option
                </li>
                <li className="list-disc border-start-0">
                Click Next: Permissions
                </li>
                <li className="list-disc border-start-0">
                Search for name of the policies you created on the initial steps (i.e. CloudAccordPart1, CloudAccordPart2, ), check those and click Next: Tags
                </li>
                <li className="list-disc border-start-0">
                Click Next: Review
                </li>
                <li className="list-disc border-start-0">
                Type CloudAccord as the Name and choose a Description (optional) for the role that you are creating
                </li>
                <li className="list-disc border-start-0">
                Click Create role
                </li>
                <li className="list-disc border-start-0">
                Search for the newly created role (i.e. CloudAccord) and click on it
                </li>
                <li className="list-disc border-start-0">
                Copy the Role ARN value and paste it below:
                </li>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="form-group p-6 my-10">
        <label htmlFor="arn" className="flex items-center gap-4">
          <FaKey size={18} />
          <p className="font-semibold text-[14px]">ARN</p>
        </label>
        <input
          type="text"
          placeholder="Eg: arn:aws:iam::123456789012:role/YourRole"
          autoComplete="off"
          id="arn"
          value={arn}
          onChange={(e) => setArn(e.target.value)}
          className="w-full p-3 mt-2 rounded-md border-2 border-light"
        />
      </div>
      <div className="my-8 border-top-2 border-bottom-2 w-full flex p-5 items-end justify-end gap-6">
        <button
          onClick={() => goBack()}
          className="bg-[#284CB3]/40 w-32 font-medium rounded-full p-2 text-white text-center"
        >
          Cancel
        </button>
        <button
          disabled={!arn}
          onClick={handleCreateServiceProvider}
          className="bg-[#284CB3] w-48 font-medium rounded-full p-2 text-white text-center"
        >
          {isLoading ? "connecting......" : "Connect AWS Account"}
        </button>
      </div>
      <Alert />
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.5303 1.46967C21.2374 1.17678 20.7626 1.17678 20.4697 1.46967L19.4697 2.46967C19.1768 2.76256 19.1768 3.23744 19.4697 3.53033C19.7626 3.82322 20.2374 3.82322 20.5303 3.53033L21.5303 2.53033C21.8232 2.23744 21.8232 1.76256 21.5303 1.46967Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.46967 1.46967C2.76256 1.17678 3.23744 1.17678 3.53033 1.46967L4.53033 2.46967C4.82322 2.76256 4.82322 3.23744 4.53033 3.53033C4.23744 3.82322 3.76256 3.82322 3.46967 3.53033L2.46967 2.53033C2.17678 2.23744 2.17678 1.76256 2.46967 1.46967Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.5303 16.5303C21.2374 16.8232 20.7626 16.8232 20.4697 16.5303L19.4697 15.5303C19.1768 15.2374 19.1768 14.7626 19.4697 14.4697C19.7626 14.1768 20.2374 14.1768 20.5303 14.4697L21.5303 15.4697C21.8232 15.7626 21.8232 16.2374 21.5303 16.5303Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.46967 16.5303C2.76256 16.8232 3.23744 16.8232 3.53033 16.5303L4.53033 15.5303C4.82322 15.2374 4.82322 14.7626 4.53033 14.4697C4.23744 14.1768 3.76256 14.1768 3.46967 14.4697L2.46967 15.4697C2.17678 15.7626 2.17678 16.2374 2.46967 16.5303Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.25 18C8.25 17.5858 8.58579 17.25 9 17.25H15C15.4142 17.25 15.75 17.5858 15.75 18C15.75 18.4142 15.4142 18.75 15 18.75H9C8.58579 18.75 8.25 18.4142 8.25 18Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.25 21C9.25 20.5858 9.58579 20.25 10 20.25H14C14.4142 20.25 14.75 20.5858 14.75 21C14.75 21.4142 14.4142 21.75 14 21.75H10C9.58579 21.75 9.25 21.4142 9.25 21Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.972 4.92398C7.16344 5.62227 6.72859 6.6435 6.74975 7.9882C6.76988 9.26733 7.15834 10.098 8.03013 10.9696C8.04426 10.9838 8.05839 10.9979 8.07249 11.012C8.5389 11.478 8.99075 11.9295 9.29578 12.5396C9.53703 13.0221 9.67111 13.5658 9.72359 14.25H14.2762C14.3288 13.5658 14.4629 13.0221 14.7041 12.5396C15.0091 11.9297 15.4608 11.4782 15.927 11.0122C15.9411 10.9981 15.9553 10.9839 15.9695 10.9697C16.8411 10.0979 17.2298 9.26723 17.2499 7.9882C17.2711 6.6435 16.8362 5.62227 16.0277 4.92398C15.202 4.21094 13.8883 3.75 11.9998 3.75C10.1113 3.75 8.79764 4.21094 7.972 4.92398ZM6.99158 3.78874C8.1779 2.7642 9.88819 2.25 11.9998 2.25C14.1115 2.25 15.8218 2.7642 17.0081 3.78874C18.2115 4.82802 18.7766 6.30678 18.7497 8.0118C18.7231 9.70654 18.1583 10.9021 17.0302 12.0303C16.5115 12.5491 16.2315 12.8389 16.0458 13.2104C15.8691 13.5638 15.7499 14.0572 15.7498 15.0001C15.7498 15.4142 15.414 15.75 14.9998 15.75H8.99984C8.80092 15.75 8.61015 15.671 8.46949 15.5303C8.32884 15.3896 8.24983 15.1989 8.24984 14.9999C8.24991 14.0571 8.13081 13.5638 7.95414 13.2104C7.76839 12.8389 7.48841 12.5491 6.96955 12.0304C5.84104 10.902 5.2766 9.70644 5.24993 8.0118C5.22311 6.30678 5.78818 4.82802 6.99158 3.78874Z"
              fill="black"
            />
          </svg>
          <p className="text-[17px] font-semibold">
            {type === "automated"
              ? "How to add an AWS account with automated setup"
              : "How to add an AWS account manually"}
          </p>
          <Link
            to="/"
            className="p-3 border-start text-[#6A6A6A] text-[12px] font-medium"
          >
            Need help? Contact support{" "}
          </Link>
        </div>
        <div className="w-full h-[400px] rounded-md overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/oMvU5wWsv0Q"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
