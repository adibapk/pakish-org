import { CourseFeeGuide, feeGuideMetadata } from "@/components/courses/course-fee-guide";

export const metadata = feeGuideMetadata("en");

export default function FeeGuidePage() {
  return <CourseFeeGuide language="en" />;
}
