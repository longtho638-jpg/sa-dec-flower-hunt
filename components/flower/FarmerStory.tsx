"use client";

import { FarmerStoryType } from "@/lib/farmerStories";
import { motion } from "framer-motion";
import { Quote, MapPin, Calendar, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function FarmerStory({ story }: { story: FarmerStoryType }) {
    if (!story) return null;

    return (
        <section className="py-6 px-4 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 overflow-hidden relative rounded-2xl">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex flex-col gap-8 items-start">

                    {/* Profile Card */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="w-full md:w-80 shrink-0"
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100 relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden relative">
                                    <Image
                                        src={story.avatar}
                                        alt={story.farmerName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="pt-16 text-center">
                                <h3 className="text-xl font-bold text-stone-900">{story.farmerName}</h3>
                                <p className="text-amber-600 font-medium text-sm mt-1">{story.specialty}</p>

                                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-stone-500">
                                    <MapPin className="w-4 h-4" />
                                    <span>{story.location}</span>
                                </div>

                                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-stone-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>Kinh nghiệm: {story.experience}</span>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                                    {story.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-stone-100 text-stone-600 font-normal">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Story Content */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex-1"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-4">
                            <Star className="w-3 h-3 fill-amber-800" />
                            CÂU CHUYỆN NHÀ VƯỜN
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent mb-6">
                            {story.title}
                        </h2>

                        <div className="relative mb-8">
                            <Quote className="w-10 h-10 text-amber-200 absolute -top-4 -left-2 -z-10" />
                            <p className="text-lg md:text-xl font-medium text-stone-800 italic leading-relaxed pl-6 border-l-4 border-amber-300">
                                {story.quote}
                            </p>
                        </div>

                        <div className="prose prose-stone text-stone-600 leading-relaxed mb-8">
                            <p>{story.story}</p>
                        </div>

                        {/* Fun Fact */}
                        <div className="bg-sky-50 rounded-xl p-4 border border-sky-100 flex gap-3 items-start">
                            <span className="text-xl">💡</span>
                            <div>
                                <h4 className="font-bold text-sky-900 text-sm">Bật mí thú vị</h4>
                                <p className="text-sky-800 text-sm">{story.funFact}</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
