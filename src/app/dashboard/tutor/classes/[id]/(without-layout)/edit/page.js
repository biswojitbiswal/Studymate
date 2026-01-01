"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateClassPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Class
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update the details below to publish your class
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        
        {/* Title */}
        <div>
          <label className="text-sm font-medium">Class Title</label>
          <Input placeholder="e.g. Maths for Class 10" />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Describe what students will learn..."
            rows={4}
          />
        </div>

        {/* Type + Visibility */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Class Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GROUP">Group</SelectItem>
                <SelectItem value="PRIVATE">Private (1–1)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Visibility</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium">Price</label>
            <Input type="number" placeholder="Enter price" />
          </div>

          <div>
            <label className="text-sm font-medium">Currency</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="INR" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Publish Class
          </Button>
        </div>
      </div>
    </div>
  );
}
